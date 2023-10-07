export default function animate(ctx, canvas, array) {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  array.forEach((planet) => {
    planet.update(ctx)
  })
}
