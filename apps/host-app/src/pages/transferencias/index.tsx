import Aside from "@/components/layout/Aside";
import LayoutLogado from "@/components/layout/LayoutLogado";
import TransacoesPage from "@/components/layout/transacao/TransacoesPage";
import { fetchDadosIniciais } from "@/features/transactions/transactionSlice";
import { AppDispatch } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function transferencias() {
  
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchDadosIniciais(session.user.id));
    }
  }, [session?.user?.id, dispatch]);

  return (
    <LayoutLogado>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto w-full lg:w-[1024px]  mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full h-max gap-8">
          <TransacoesPage />
        </div>
      </div>
    </LayoutLogado>
  );
}
