import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const loginHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      { email: email, password: password }
    );

    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);  
      navigate('/dashboard');
    }

    setEmail('');
    setPassword('');

  };

  const signUpHandler = async (e) => {
     e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      { name:name, email: email1, password: password1 }
    );

    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);  
      navigate('/dashboard');
    }
    setName('');
    setEmail1('');
    setPassword1('');
    setPassword2('');

  };
  

  useEffect(() => {
    if (!password1 || !password2) {
      setError("");
      setIsSubmitDisabled(true);
    } else if (password1 !== password2) {
      setError("Passwords do not match");
      setIsSubmitDisabled(true);
    } else {
      setError("");
      setIsSubmitDisabled(false);
    }
  }, [password1, password2]);

  return (
    <>
      <Tabs defaultValue="login" className="h-full">
        <TabsContent value="login">
          <Card className=" w-full rounded-none border-l-2 border-[#281e4b] px-10 h-full  justify-center ">
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center ">
                Access your hiveboard.
              </CardDescription>
            </CardHeader>
            <TabsList className=" ml-5 justify-center w-[90%] h-12 my-3 gap-2 bg-transparent !border-primary-foreground border-1 !p-1">
              <TabsTrigger value="login" className='hover:!bg-[#2e255c] hover:!border-transparent '>Login</TabsTrigger>
              <TabsTrigger value="signup" className='hover:!bg-[#2e255c] hover:!border-transparent '>Sign Up</TabsTrigger>
            </TabsList>
            <form onSubmit={(e) => loginHandler(e)}>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label className="text-xs py-2" htmlFor="email">
                      EMAIL ADDRESS
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      className="py-5"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs py-2" htmlFor="password">
                      PASSWORD
                    </Label>
                    <Input
                      className="py-5"
                      id="password"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 pt-7">
                <Button type="submit"  className="w-full !py-5 !bg-[#A456F7] text-white !text-base hover:!border-transparent !shadow-[0_0_12px_3px_rgba(255,255,255,0.2)] hover:!shadow-[0_0_20px_6px_rgba(255,255,255,0.2)] !transition-all duration-200 hover:-translate-y-1 ">
                  Access Hive Center
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className=" w-full rounded-none border-l-2 border-[#281e4b] px-10 h-full  justify-center ">
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Join the Hive
              </CardTitle>
              <CardDescription className="text-center ">
                Create your hiveboard profile.
              </CardDescription>
            </CardHeader>

            <TabsList className=" ml-5 justify-center w-[90%] h-12 my-3 gap-2 bg-transparent !border-primary-foreground border-1 !p-1">
              <TabsTrigger value="login" className='hover:!bg-[#2e255c] hover:!border-transparent '>Login</TabsTrigger>
              <TabsTrigger value="signup" className='hover:!bg-[#2e255c] hover:!border-transparent '>Sign Up</TabsTrigger>
            </TabsList>
            <form onSubmit={signUpHandler}>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label className="text-xs py-2" htmlFor="email">
                      FULL NAME
                    </Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="Enter your full name"
                      required
                      className="py-4"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs py-2" htmlFor="email">
                      EMAIL ADDRESS
                    </Label>
                    <Input
                      id="email1"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                      className="py-4"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs py-2" htmlFor="password">
                      PASSWORD
                    </Label>
                    <Input
                      className="py-4"
                      id="password1"
                      type="password"
                      required
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      placeholder="Create a password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs py-2" htmlFor="Confirmpassword">
                      CONFIRM PASSWORD
                    </Label>
                    <Input
                      className="py-4"
                      id="password2"
                      type="password"
                      required
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Confirm your password"
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 mt-5">
                <Button
                  type="submit"
                   className="w-full !bg-[#A456F7] !py-5 text-white !text-base hover:!border-transparent !shadow-[0_0_12px_3px_rgba(255,255,255,0.2)] hover:!shadow-[0_0_20px_6px_rgba(255,255,255,0.2)] !transition-all duration-200 hover:-translate-y-1 "
                  disabled={isSubmitDisabled}
                >
                  Initialize Hive Profile
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Login;
