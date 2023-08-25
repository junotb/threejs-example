export default function Page({
  params
}: {
  params: {
    example: string
  }
}) {
  return (
    <div>My Example: {params.example}</div>
  )
}