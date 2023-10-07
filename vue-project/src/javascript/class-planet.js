export default class Planet {
  constructor(x, y, radius, distanceFromCenter, radians, name, discription, score) {
    this.x = x
    this.originalX = x
    this.y = y
    this.originalY = y
    this.radius = radius
    this.distanceFromCenter = distanceFromCenter
    this.radians = radians
    this.name = name
    this.discription = discription
    this.score = score
    this.velocity = 0.003
  }

  draw(ctx) {
    let image = new Image()
    image.src = `../../images/${this.name}.png`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'blue'
    ctx.drawImage(
      image,
      0,
      0,
      160,
      100,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    )
    // ctx.fill()
    ctx.closePath()
  }

  update(ctx) {
    this.radians += this.velocity

    this.x = this.originalX + Math.cos(this.radians) * this.distanceFromCenter
    this.y = this.originalY + Math.sin(this.radians) * this.distanceFromCenter

    this.draw(ctx)
  }

  clickCircle(xmouse, ymouse) {
    let xDistance = xmouse - this.x
    let yDistance = ymouse - this.y

    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))

    return distance <= this.radius ? true : false
  }
}
