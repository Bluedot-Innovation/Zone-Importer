## Setting up

Before running the script, we need to set up your API keys and point to a csv file. Create a `.env` file and add the following 3 keys, filling them with your own details. If the `CSV_FILE_NAME` is left blank, the importer will prompt you to choose a file in the `csv` folder.

```
CUSTOMER_API_KEY=<Add key here>
API_KEY=<Add key here>
CSV_FILE_NAME=<Add file name here>
```

## Additional info

A custom action is automatically added on to the zones to make sure the SDKs call back the mobile app when users visit the zones.

## Node version

Please make sure you are running at least node version 6, as this code uses features unsupported in earlier versions.

## Running the script

To run the script, execute the following commands from your CLI.

`npm install`

`npm start`
