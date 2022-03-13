module.exports = {
  mode: "jit",
  content: [
    // Example content paths...
    './src/app/**/*.{ts,html}',
    './src/app/components/**/*.{ts,html}'
  ],
  theme: {
    extend: {
      textColor:{
        skin:{
          primary:'var(--txt-primary)',
          danger:'var(--txt-danger)',
          light:'var(--txt-light)'
        }
      },
      backgroundColor:{
        skin: {
          primary:'var(--bg-primary)',
          primaryLight:'var(--bg-primary-light)',
          secondary:'var(--bg-secondary)',
          ternary:'var(--bg-ternary)',
          form: 'var(--bg-form)',
          danger:'var(--bg-danger)',
          dangerLight:'var(--bg-danger-light)',
        }
      },
      width:{
        '12/25': '48%',
      },
      borderColor:{
        skin:{
          primary:'var(--txt-primary)',
          danger:'var(--txt-danger)',
          light:'var(--txt-light)'
        }
      }
    },
  },
  plugins: [],
}
