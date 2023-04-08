export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL: null | string = null

    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      baseURL = reader.result as string
      resolve(baseURL)
    }
  })
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      if (reader.result) resolve(reader.result as string)
    }
  })
}

export const canvasToBlob = (
  canvas: HTMLCanvasElement
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    canvas.toBlob(resolve)
  })
}

export function toDataUrl(
  url: string,
  callback: (base64: string | ArrayBuffer | null) => void
) {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    const reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

export function urlToImageFile(url: string, filename: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()

  // img.crossOrigin = 'anonymous' // if the image is hosted on a different domain

  return new Promise((resolve) => {
    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height
      if (ctx) ctx.drawImage(img, 0, 0)
      canvas.toBlob(function (blob) {
        if (blob) {
          const file = new File([blob], filename, { type: blob.type })
          resolve(file)
        }
        // Do something with the file object, e.g. upload it to a server
      }, 'png')
    }
    img.src = url
  })
}
