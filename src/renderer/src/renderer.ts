// ctx Object
const drawGrid = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasheight: number,
  cellSize: number
): void => {
  ctx.beginPath()
  ctx.lineWidth = 0.5
  const numOfColumns = canvasWidth / cellSize
  const numOfRows = canvasheight / cellSize
  for (let i = 1; i <= numOfColumns; i++) {
    ctx.moveTo(i * cellSize, 0)
    ctx.lineTo(i * cellSize, canvasheight)
  }
  for (let i = 1; i <= numOfRows; i++) {
    ctx.moveTo(0, i * cellSize)
    ctx.lineTo(canvasWidth, i * cellSize)
  }
  ctx.stroke()
  ctx.closePath()
}

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  cellSize: number,
  { mode, dir }: { mode: 'semi' | 'full'; dir: 'clockwise' | 'anticlockwise' }
): void => {
  ctx.beginPath()
  ctx.lineWidth = 2
  const arcScale = mode === 'semi' ? 1 : 2

  ctx.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    5 * cellSize,
    0,
    arcScale * Math.PI,
    !(dir === 'clockwise')
  )
  ctx.stroke()
  ctx.closePath()
}

type AxesType = {
  [k: string]: boolean | undefined
  xAxis?: boolean
  yAxis?: boolean
  nXAxis?: boolean
  nYAxis?: boolean
}
const drawAxes = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  axesConfig: AxesType
): void => {
  ctx.beginPath()
  ctx.lineWidth = 4
  if (axesConfig.xAxis) {
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2)
    ctx.lineTo(canvasWidth, canvasHeight / 2)
  }
  if (axesConfig.yAxis) {
    ctx.moveTo(canvasWidth / 2, 0)
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2)
  }
  if (axesConfig.nXAxis) {
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2)
    ctx.lineTo(0, canvasHeight / 2)
  }
  if (axesConfig.nYAxis) {
    ctx.moveTo(canvasWidth / 2, canvasHeight)
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2)
  }

  ctx.stroke()
  ctx.closePath()
}

export function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('c') as HTMLCanvasElement

    let CANVAS_WIDTH = window.innerWidth / 2
    let CANVAS_HEIGHT = window.innerHeight / 2
    let CELL_SIZE = 0.05 * CANVAS_WIDTH

    const updateLayout = (): void => {
      CANVAS_WIDTH = window.innerWidth / 2
      CANVAS_HEIGHT = window.innerHeight / 2
      CELL_SIZE = 0.05 * CANVAS_WIDTH
      canvas.width = CANVAS_WIDTH
      canvas.height = CANVAS_HEIGHT
    }

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      // draw positive x axis / negative x axis / positive y axis / negative y axis
      window.addEventListener('resize', () => {
        updateLayout()
        drawCircle(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, CELL_SIZE, { mode: 'semi', dir: 'clockwise' })
        drawGrid(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, CELL_SIZE)
        drawAxes(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, {
          xAxis: false,
          yAxis: false,
          nXAxis: true,
          nYAxis: true
        })
      })

      updateLayout()
      drawCircle(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, CELL_SIZE, { mode: 'semi', dir: 'clockwise' })
      drawGrid(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, CELL_SIZE)
      drawAxes(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, {
        xAxis: false,
        yAxis: false,
        nXAxis: true,
        nYAxis: true
      })
    }
  })
}

init()
