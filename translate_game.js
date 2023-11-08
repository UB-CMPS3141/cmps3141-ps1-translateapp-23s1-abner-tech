$(function() {
	function flipObject(obj) {
		const flippedObj = {};
		for (const key in obj) {
		  if (obj.hasOwnProperty(key)) {
			flippedObj[obj[key]] = key;
		  }
		}
		return flippedObj;
	  }

	  
	var lang_from = "English";  // Change the source language
	var lang_to = "Spanish";   // Change the target language
	var current_dict = dicts[lang_from][lang_to];  // Reverse the dictionaries
	const flipped = flipObject(current_dict);
	// console.log(flipped);

	// console.log(current_dict);
  
	var randomWord = getRandomWord(current_dict);
	var inputElement = document.getElementById("EnglishInput"); // Assuming input is in English
	var previousEntries = document.getElementById("DisplayEntries");
  
	// Set the translation text to the random word
	$("#translation").text(randomWord);
  
	// Set focus on the input field
	inputElement.focus();
  
	// Function to get a random word from the dictionary
	function getRandomWord(dictionary) {
	  var keys = Object.keys(dictionary);
	  var randomKey = keys[Math.floor(Math.random() * keys.length)];
	  return dictionary[randomKey];
	}
  
	// Function to load a new random word and validate the input
	function loadNewWord() {

	  var userInput = inputElement.value;
  
	//   console.log(randomWord + "   " + userInput + "   " + translatedWord);
	//   console.log(current_dict[userInput]);
  
	  var correct = flipped[randomWord];
	//   console.log(correct);
  
	  // Check if the user input matches the correct translation
	  if (userInput == correct || userInput.toLowerCase() == correct) {
		// Create a new table row with the previous entries, showing a checkmark
		var newRow = document.createElement("tr");
		newRow.innerHTML = `
		  <td>
			<p style="color: blue">${randomWord}</p>
		  </td>
		  <td class="twds" id="previousEnglish">
			<p style="color: blue;">${userInput}</p>
		  </td>
		  <td class="twds" id="previousAnswer">
			<p style="color: black; line-height: normal;"><span style="color: black;">&#10003;</span></p>
		  </td>
		`;
	  } else {
		// Create a new table row with the previous entries, showing the correct translation in red
		var newRow = document.createElement("tr");
		newRow.innerHTML = `
		  <td>
			<p style="color: red">${randomWord}</p>
		  </td>
		  <td class="twds" id="previousEnglish">
			<p style="color: red;text-decoration: line-through;">${userInput}</p>
		  </td>
		  <td class="twds" id="previousAnswer">
			<p style="color: red; line-height: normal; ">${correct} </p>
		  </td>
		`;
	  }
  
	  // Append the new row to the previous entries table
	  previousEntries.prepend(newRow);
  
	  // Get a new random word and update the input field
	  randomWord = getRandomWord(current_dict);
	  $("#translation").text(randomWord);
	  inputElement.value = "";
	  inputElement.focus();
	}

	 
// Autocomplete widget setup
$("#EnglishInput").autocomplete({
	source: function(request, response) {
	  // Match the input with English words from the dictionary
	  var inputText = request.term.toLowerCase();
	  var matches = [];
	  for (var word in current_dict) {
		if (word.indexOf(inputText) >= 0) {
		  matches.push(word);
		}
	  }
	  response(matches);
	},
	minLength: 2, // Show suggestions after typing 2 characters
	select: function(event, ui) {
	  // When a suggestion is selected
	  var selectedWord = ui.item.value;
	  $("#EnglishInput").val(selectedWord); // Set the input field value
	  loadNewWord();
	  $("#EnglishInput").focus(); // Return focus to the input field
	  closeAutocompleteSuggestions(); // Close autocomplete suggestions
	  return false;
	}
  });
  
  // Function to close autocomplete suggestions
  function closeAutocompleteSuggestions() {
	setTimeout(function() {
	  $("#EnglishInput").autocomplete("close");
	}, 1000); // Adjust the delay (in milliseconds) as needed
  }
  
	 s

  
	// Click event for the "See Answer" button
	$("#seeAnswer").on("click", function() {
	  loadNewWord();
	});


	var keypress = document.getElementById("EnglishInput");

	keypress.addEventListener("keypress", function(event){
	  if(event.key === "Enter") {
		  loadNewWord();
		  closeAutocompleteSuggestions();
	  }
	})

  });
  


