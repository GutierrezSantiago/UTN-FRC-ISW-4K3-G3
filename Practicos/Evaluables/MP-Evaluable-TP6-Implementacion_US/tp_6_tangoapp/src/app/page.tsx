"use client";
import useHome from "@/components/hooks/useHome";
import LoadingModal from "@/components/modals/LoadingModal";

export default function Home() {
  const { system } = useHome();
  return (
    <div className="flex px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] items-center">
      <LoadingModal open={true}>Cargando...</LoadingModal>
    </div>
  );
}
