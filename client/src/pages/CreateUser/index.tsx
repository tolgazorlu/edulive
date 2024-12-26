import { useEffect, useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { useCreateUserMutation, useGetUserIsExist } from "../../api/auth";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useNavigate } from "react-router-dom";
import NavbarSection from "../Landing/NavbarSection";

export function CreateUser() {
  const { OCId, ethAddress } = useOCAuth();
  const { data: userExist } = useGetUserIsExist(OCId);
  const navigate = useNavigate();

  useEffect(() => {
    if (userExist) {
      navigate("/");
    }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("learner");

  const { mutateAsync: createNewUser } = useCreateUserMutation();

  const handleSumbit = async () => {
    try {
      await createNewUser({
        ocid: OCId,
        name: name,
        email: email,
        role: role,
        edu_address: ethAddress,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarSection OCId={OCId} ethAddress={ethAddress} />
      <section className='grid text-center h-screen items-center p-8'>
        <div>
          <Typography variant='h3' color='white' className='mb-2'>
            Dear User
          </Typography>
          <Typography className='mb-6 text-gray-600 font-normal text-[18px]'>
            Enter your informations in your first time
          </Typography>
          <form
            action='#'
            className='mx-auto max-w-[24rem] text-left flex flex-col gap-4'
          >
            <Input
              label='Enter Email Address'
              id='email'
              color='gray'
              size='lg'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
            />
            <Input
              label='Enter Your Full Name'
              id='name'
              color='gray'
              size='lg'
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='bg-transparent py-3 px-2 border rounded-md'
            >
              <option value='teacher'>Teacher</option>
              <option value='learner'>Learner</option>
            </select>

            <Button
              onClick={handleSumbit}
              color='gray'
              size='lg'
              className='mt-6'
              fullWidth
            >
              Create USER
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateUser;
