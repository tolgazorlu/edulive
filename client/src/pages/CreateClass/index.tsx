// @components
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

// @icons

function CreateClass() {
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
              Create A Class
            </Typography>
            <Typography className='!text-gray-600 text-[18px] font-normal md:max-w-sm'>
              You can create class and start a lesson only one button!
            </Typography>
          </CardHeader>
          <CardBody>
            <form action='#' className='flex flex-col gap-4 md:mt-12'>
              <Button size='lg' color='deep-orange' fullWidth>
                Start to Teach
              </Button>

              <Typography
                variant='small'
                className='text-center mx-auto max-w-[19rem] !font-medium !text-gray-600'
              >
                Upon creating class, you consent to abide by our{" "}
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

export default CreateClass;
