Prerequirments:
	you should have node and npm installed on your device;

Instructions:
	this is a list of scripts you can run in the project using "npm run (script-name)" and their uses:
		"start": start the server and allow you to use the program
        "build": build the project files
        "jasmine": run unit test on the distribution files
        "test": build the project then run tests on it
        "prettier": prettify the source files
        "linter": lint the source files
    start the server then Head to http://localhost:3000/api/imagesBrowser to browse available images and generate url forms easily with reduced chances of errors

Documntation:
    this form should be used in the url to generate images http://localhost:3000/api/image?image=IMAGE-NAME&width=DESIRED-WIDTH&height=DESIRED-HEIGHT
    you will get a varity of error status code with the expected reason when proplems regarding user input or server errors occur
