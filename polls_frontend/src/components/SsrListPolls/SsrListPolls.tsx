import {useState} from "react";
import axios from "axios";
import Loader from "@/components/Loader/Loader.tsx";

const SsrListPolls = () => {
  const [loading, setLoading] = useState(true);
  const [ssr, setSSR] = useState<string | TrustedHTML>(async () => {
    await axios.get("http://localhost:3000/api/polls/ssr")
      .then((response) => {
        setSSR(response.data)
        setLoading(false);
      })
  });

  if (loading) return <div className="flex justify-center">
    <Loader loading={loading} size={50}/>
  </div>;

  return <div dangerouslySetInnerHTML={{__html: ssr}}></div>
};

export default SsrListPolls;