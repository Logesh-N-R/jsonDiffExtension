

function diffUsingJS(viewType) {
	"use strict";
	var byId = function (id) { return document.getElementById(id); },
		base = difflib.stringAsLines(byId("baseText").value),
		newtxt = difflib.stringAsLines(byId("newText").value),
		sm = new difflib.SequenceMatcher(base, newtxt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = byId("diffoutput");
		// contextSize = byId("contextSize").value;

	diffoutputdiv.innerHTML = "";
	// contextSize = contextSize || null;

	diffoutputdiv.appendChild(diffview.buildView({
		baseTextLines: base,
		newTextLines: newtxt,
		opcodes: opcodes,
		baseTextName: "Base Text",
		newTextName: "New Text",
		contextSize: null,
		viewType: viewType
	}));
}

document.getElementById('sidebyside').addEventListener('click',function(){
    diffUsingJS(0);
})
document.getElementById('inline').addEventListener('click',function(){
    diffUsingJS(1);
})
// Function to format and display JSON with syntax highlighting
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:\s*)?|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key string-key';
            } else {
                cls = 'string-value';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// Function to format and display JSON
function formatAndDisplayJSON(inputId, outputId) {
    const input = document.getElementById(inputId).value;
    const output = document.getElementById(outputId);
    try {
        const jsonObj = JSON.parse(input);
        output.innerHTML = syntaxHighlight(JSON.stringify(jsonObj, null, 2));
    } catch (e) {
        output.textContent = 'Invalid JSON';
    }
}

// Load previous values from local storage
window.onload = function() {
    const baseText = localStorage.getItem('baseText');
    const newText = localStorage.getItem('newText');
    if (baseText !== null) {
        document.getElementById('baseText').value = baseText;
        formatAndDisplayJSON('baseText', 'formattedBaseText');
    }
    if (newText !== null) {
        document.getElementById('newText').value = newText;
        formatAndDisplayJSON('newText', 'formattedNewText');
    }
};

// Save values to local storage and format/display JSON whenever they change
document.getElementById('baseText').addEventListener('input', function() {
    localStorage.setItem('baseText', this.value);
    formatAndDisplayJSON('baseText', 'formattedBaseText');
});
document.getElementById('newText').addEventListener('input', function() {
    localStorage.setItem('newText', this.value);
    formatAndDisplayJSON('newText', 'formattedNewText');
});
