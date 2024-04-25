import { IDataType } from '@/service/type'
export default function (): Promise<IDataType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: '操作成功',
        code: 200,
        data: {
          userId: 1,
          name: 'admin',
          avatar: '',
          roles: ['admin'],
          permissions: []
        }
      })
    }, 100)
  })
}
