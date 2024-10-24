import {Icon} from "@iconify/react";

interface Props {
  loading: boolean;
  size: number;
}

const Loader = (
  {loading, size}: Props
) => {
  if (!loading) return null;
  return <Icon icon="bx:loader-alt" className="animate-spin" style={{fontSize: size + "px"}}/>
};

export default Loader;