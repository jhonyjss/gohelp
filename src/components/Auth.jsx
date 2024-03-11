import { Input, Button } from "@material-tailwind/react";
import InputMask from "react-input-mask";

export default function Auth({ setUnlock }) {
  const maskOptions = {
    mask: "999.999.999-99",
    maskChar: "_",
    alwaysShowMask: false,
    formatChars: {
      9: "[0-9]"
    }
  };

  const handleUnlock = () => {
    setUnlock(true);
    localStorage.setItem("unlocked", true);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="w-72">
        <InputMask {...maskOptions}>
          {() => (
            <Input
              className="border-2 !border-t-green-900 focus:!border-t-transparent border-green-900 z-40 focus:border-green-500 focus:ring-green-500"
              label="DIGITE SEU CPF"
              color="green"
              size="lg"
            />
          )}
        </InputMask>
      </div>
      <div>
        <Button fullWidth color="green" onClick={handleUnlock}>
          Acessar minha carteirinha
        </Button>
      </div>
    </section>
  );
}
