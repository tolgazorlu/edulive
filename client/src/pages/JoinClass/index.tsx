// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

// @icons

function JoinClass() {
  return (
    <section className='px-8'>
      <div className='container mx-auto h-screen grid place-items-center'>
        <Card
          shadow={false}
          className='md:px-24 md:py-14 py-8 border border-blue-gray-900 bg-black'
        >
          <CardHeader
            shadow={false}
            floated={false}
            className='text-center bg-black'
          >
            <Typography
              variant='h1'
              color='white'
              className='mb-4 !text-3xl lg:text-4xl'
            >
              Join A Class
            </Typography>
            <Typography className='!text-gray-600 text-[18px] font-normal md:max-w-sm'>
              If you don't know class meeting id, please contact your teacher.
            </Typography>
          </CardHeader>
          <CardBody>
            <form action='#' className='flex flex-col gap-4 md:mt-12'>
              <div>
                <label htmlFor='email'>
                  <Typography
                    variant='small'
                    color='gray'
                    className='block font-medium mb-2'
                  >
                    Enter a meeting id
                  </Typography>
                </label>
                <Input
                  color='gray'
                  size='lg'
                  type='text'
                  name='meeting-id'
                  className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 text-white'
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <Button size='lg' color='deep-orange' fullWidth>
                JOIN
              </Button>

              <Typography
                variant='small'
                className='text-center mx-auto max-w-[19rem] !font-medium !text-gray-600'
              >
                Upon joining in, you consent to abide by our{" "}
                <a href='#' className='text-blue-600'>
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href='#' className='text-blue-600'>
                  Privacy Policy.
                </a>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default JoinClass;
