$('#display-picture').click(
    function () {
        $('#imgupload').trigger('click');
    });

$("#imgupload").change(function (event) {
    var input = document.getElementById("imgupload");
    DP = input.files[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(DP);
    var img = document.getElementById("display-picture");
    fReader.onloadend = function (event) {
        img.src = event.target.result;
        USER_CV_DATA["display-picture"] = img.src
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA));
    }
    uploadToStorage(DP)
        .then((url) => {
            img.src = url;
            USER_CV_DATA["display-picture"] = img.src
            LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA));
        })
});

var setContent = {
    template3:{
        name: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        current_designation: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        about: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        address: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        phone_number: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        social_Link: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        email: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },   
        skills: function (id, value) {
            let skillsList = $(`#${id}`)
            value.forEach(skill => {
                let li = `<li><label contenteditable="true" class="cvmaker-editable skill">${skill}</label>
                                    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                                </li>`;
                skillsList.append(li)
            })
        },
        experience: function (id, value) {
            let experienceList = $(`#${id}`);
            value.forEach((experienceDetails, idx) => {
                let div = `   <div class="col-12 text-center">
                                <div class="d-inline-block text-left">
                                <h5><span id='designation' contenteditable="true" class="cvmaker-editable designation">${experienceDetails.designation}</span></h5>
                                <span id='remove' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                                <h6><span id='company' contenteditable="true" class="cvmaker-editable organization"><i>${experienceDetails.organization}</i></span></h6>
                                </div>
                            </div>`;


                experienceList.append(div);
        
    
            })
        }
    }
    
}
var DEFAULT_SNIPPETS = {
 
    SKILLS: `<li><label contenteditable="true" class="cvmaker-editable skill">Css</label> 
                <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
            </li>`, 
    EXPERIENCE: `       <div class="col-12">
    <h5><span id='designation' contenteditable="true" class="cvmaker-editable designation">YOGA INSTRUCTOR</span></h5>
    <span id='remove' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
    
    <h6><span id='company' contenteditable="true" class="cvmaker-editable organization">Anytime Fitness</span></h6>

</div>`
 
}

function addPoint(obj) {

    var str = obj.parentElement.className;
    var arr = str.split(' ');
    var category = arr[arr.length - 1].split('-')[0];
    console.log(category)
    selectCategory[category](`${category}-content`);

    // Adding Events
    addEventListeneronEditable();

    // Updating JSON
    UPDATE_LOCAL_CVDATA[category]();
}

function deletePoint(obj) {
    var category = obj.parentElement.parentElement.id;

    if (category.includes('work_details'))
        category = 'experience';

    var outerDiv = obj.parentElement.parentElement;
    outerDiv.removeChild(obj.parentElement);
    console.log(category);
    // Updating JSON
    UPDATE_LOCAL_CVDATA[category]();


}
function addSubPoint(obj) {

    var parent = obj.parentElement;
    var content = parent.lastElementChild.innerHTML;
    if (!parent.lastElementChild.firstElementChild) {
        var workdetail = DEFAULT_SNIPPETS.WORK_DETAILS;
    } else {
        var workdetail = parent.lastElementChild.firstElementChild.outerHTML;
    }
    parent.lastElementChild.innerHTML = content + workdetail;
    addEventListeneronEditable();
}


var selectCategory = { 
    skills: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild || !contentDiv.firstElementChild.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.SKILLS;
        else
            var newRow = contentDiv.firstElementChild.firstElementChild.outerHTML;

        document.getElementsByClassName(category)[0].firstElementChild.innerHTML = contentDiv.firstElementChild.innerHTML + '' + newRow;
    }, 
    experience: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.EXPERIENCE;
        else
            var newRow = contentDiv.firstElementChild.outerHTML;

        document.getElementsByClassName(category)[0].innerHTML = contentDiv.innerHTML + '' + newRow;
    }
}