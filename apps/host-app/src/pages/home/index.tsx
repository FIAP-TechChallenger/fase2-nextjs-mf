"use client";

import Aside from "@/components/layout/Aside";
import CardNovaTransacao from "@/components/layout/transacao/CardNovaTransacao";
import Extrato from "@/components/layout/transacao/Extrato";
import Saldo from "@/components/layout/transacao/Saldo";
import LayoutLogado from "@/components/layout/LayoutLogado";

export default function Index() {
  return (
    <LayoutLogado>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto max-w-[1024px] mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 w-full h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full lg:max-w-[690px] h-max gap-8">
          <Saldo />
          <CardNovaTransacao />
        </div>
        <Extrato />
      </div>
    </LayoutLogado>
  );
}
