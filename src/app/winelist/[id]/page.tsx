import CardDetail from "@/components/Card/CardDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      와인 상세 페이지입니다. ID:{id}
      <CardDetail id={id} />
    </div>
  );
}
