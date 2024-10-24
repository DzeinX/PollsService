import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  loading: boolean;
  title: string;
}

const FormSubmitButton = ({loading, title}: Props) => {
  return <Button disabled={loading} type="submit" className="w-[100px]">
    {loading
      ? <Icon icon="bx:loader-alt" style={{fontSize: "20px"}} className="animate-spin"/>
      : title
    }
  </Button>
};

export default FormSubmitButton;