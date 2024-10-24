import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import AuthForm from "@/components/AuthForm/AuthForm.tsx";


const AuthPage = () => {
  return <div className="show flex justify-center items-center h-[calc(100vh_-_20px_-_80px_-_60px)]">
    <Card className="w-full">
      <div className="flex items-center gap-5 w-full">
        <div className="w-[50%]">
          <CardHeader>Вход</CardHeader>
          <CardContent>
            <AuthForm/>
          </CardContent>
        </div>
        <div className="w-[50%] p-10 flex items-center justify-center">
          <img src="login_img.png" width="300px" alt=""/>
        </div>
      </div>
    </Card>
  </div>
};

export default AuthPage;