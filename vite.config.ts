import { resolve } from 'path';

export default {
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')
      ],
      name: 'isValid',
      fileName: (format, name) => {
        if (format === 'es') {
          return `${name}.js`
        }

        return `${name}.${format}`
      }
    }
  }
}
