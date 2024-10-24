interface Props {
  message: string;
}

const GreetingMessage = (
  {message}: Props
) => {
  if (message === "") return null;
  return <div className="show absolute z-30 inset-0 bg-[#ca6d8b] flex justify-center items-center rounded-[40px] text-white text-3xl">
    {message}
  </div>
};

export default GreetingMessage;