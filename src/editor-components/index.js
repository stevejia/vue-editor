export default [
  {
    title: '挂载组件1',
    name: 'MountComponent1',
    content: {
      template: `
              <div style="width: 300px; height: 300px; background: red;">
                  {{ text }}
              </div>
              `,
      data() {
        return { text: 'MountComponent1' }
      },
      mounted() {
        this.text = 'mounted MountComponent1'
      }
    }

  },
  {
    title: '挂载组件2',
    name: 'MountComponent2',
    content: {
      template: `
              <div>
                  {{ text }}
              </div>
              `,
      data() {
        return { text: 'MountComponent2' }
      },
      mounted() {
        this.text = 'mounted MountComponent2'
      }
    }

  }

];