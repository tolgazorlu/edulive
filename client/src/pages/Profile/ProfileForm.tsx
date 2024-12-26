import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateUserMutation, useGetUserIsExist } from "@/api/auth";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { Label } from "@/components/ui/label";

export function ProfileForm() {
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
    <form onSubmit={handleSumbit} className='space-y-6'>
      <div>
        <Label>Email</Label>
        <Input
          id='email'
          color='gray'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label>Full Name</Label>
        <Input
          id='name'
          color='gray'
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label>Role</Label>{" "}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='bg-transparent py-3 px-2 border rounded-md w-full'
        >
          <option value='teacher'>Teacher</option>
          <option value='learner'>Learner</option>
        </select>
      </div>
      <Button type='submit'>Create profile</Button>
    </form>
  );
}
