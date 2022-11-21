************************************************************************************************************
Docker
************************************************************************************************************
To create or run the container with all the tests or to update it in case changes have been made, run the command:

* docker-compose up -d

If you want to run a specific test, run the following command:

* docker run -v $PWD:/tests codeceptjs/codeceptjs codeceptjs run --grep "NAME OF FEATURE"

To identify the "NAME OF FEATURE" enter the file of the test you want to run and in the first line you will find the "FEATURE"

If you want to see the step by step of the executed commands, run the following command

* docker run -v $PWD:/tests codeceptjs/codeceptjs codeceptjs run --steps

For the last two commands, a new container will be created and executed for each executed command

You can also combine the two flags, to get both options in one command:

* docker run -v $PWD:/tests codeceptjs/codeceptjs codeceptjs run --grep "NAME OF FEATURE" --steps


************************************************************************************************************
You can also run the tests locally
************************************************************************************************************

After installing all the dependencies, you can run the following commands:

To run all tests run the following command:

* npx codeceptjs run

If you want to run a specific test, run the following command:

* npx codeceptjs run --grep "NAME OF FEATURE"

If you want to see the step by step of the executed commands, run the following command

* npx codeceptjs run --steps

You can also combine the two flags, to get both options in one command:

* npx codeceptjs run --grep "NAME OF FEATURE" --steps

