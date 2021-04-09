import * as Yup from 'yup';

const MAX_FILE_SIZE = 2048 * 1024
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
]

export const imageField = Yup.mixed()
  .test('fileFormat', 'Formato no soportado.', (value) => {
    if(value?.type) return SUPPORTED_FORMATS.includes(value.type)
    return true
  })
  .test('fileSize', 'El tamaño de la imagen no puede superar 2Mb.', (value) => {
    if(value?.size) return value.size <= MAX_FILE_SIZE
    return true
  })