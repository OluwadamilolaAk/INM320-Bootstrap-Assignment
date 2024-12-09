// Declare a global Variable jsonData for storing all json fetched data
let jsonData;

// async function method to load json data
const loadJsonFile = async() =>{
// try to fetch json data and catch if there is error
    try {
        // Await the fetch request
        const response = await fetch("/assets/data/content.json")
        if(response.status == 200){
            // await the response.json() data
            jsonData = await response.json()

            // check data on console
            console.log("Here:", jsonData)

            // initiate SideBar function to load side bar data
            loadSideBar()
            loadTicketsCard()
            loadTaskCard()
        }
    } catch (error) {
        console.log(error)
    }
}
// Initiate the loadJsonFile function
loadJsonFile()

// load SideBar function
const loadSideBar = () =>{
    // Get The Parent SideBar Menu Tag
    const sideBarLink = document.getElementById("sideBarLink");

    // Check if jsondata and jsondata.sidebar are valid
    if(jsonData && jsonData.sideBar){
        // forEach
        jsonData.sideBar.forEach((element, index) => {

            // Create an a Tag
            const newLink = document.createElement("a")

            // Setting the class for the a tag and add active to only the first element in the sidebar array
            index == 0 ? newLink.setAttribute("class", "nav-link active") : newLink.setAttribute("class", "nav-link")

            // setting the href attribute for the a tag
            newLink.setAttribute("href", "#")

            // Creating an i element (icons)
            const newlinkIcon = document.createElement("i");

            // Setting the class for the icons
            newlinkIcon.setAttribute("class", `bi ${element.icon}`)

            // Creating a span element
            const linkText = document.createElement("span")

            // Setting the text Content for the span tag
            linkText.textContent = ` ${element.name}`;

            // Adding the icon inside the a tag as a child of the a tag
            newLink.appendChild(newlinkIcon)

            // Adding the span inside the a tag as a child of the a tag
            newLink.appendChild(linkText)

            // Adding the a tag element to the sideBar as a child
            sideBarLink.appendChild(newLink)
        });
    }else{
        // if jsondata or jsondata.sidebar are invalid log no sidebar
        console.log("No Sidebar")
    }
}


// Load Tickets Card #1
const loadTicketsCard = () =>{
    // Get The Ticket Card ID
    const ticketDetails = document.getElementById("ticketDetails");

    // Check if jsondata and jsondata.tickets are valid
    if(jsonData && jsonData.tickets){

        //Iterate through ticket category data
        jsonData.tickets.forEach(ticket => {

            // Create a div Tag for the individual ticket cateogory
            const ticketDiv = document.createElement("div")

            // set class for the div tag
            ticketDiv.setAttribute("class", "d-flex justify-content-between p-2 border-bottom")

            // create a p tag for ticket category
            const ticketCategory = document.createElement("p")

            // set css class for the category tag
            ticketCategory.setAttribute("class", "text-start text-secondary mb-0")

            // set ticket category content
            ticketCategory.textContent = `${ticket.category}`

            // create new p tag for ticket count for each category
            const ticketCount = document.createElement("p")

            // set css class for each 
            ticketCount.setAttribute("class", "text-secondary mb-0")

            // set ticket count content
            ticketCount.textContent = `${ticket.count}`

            // append both ticket category and ticket to the individual ticket div tag
            ticketDiv.appendChild(ticketCategory)
            ticketDiv.appendChild(ticketCount)

            // Add ticket category div tag for each div to the ticket card.
            ticketDetails.appendChild(ticketDiv)

        });
    }else{
        console.log("NO Tickets")
    }
}

// Load Tasks Card #2
const loadTaskCard = () =>{
    
    // Get The Ticket Card ID
    const taskDetails = document.getElementById("taskDetails");

    // Check if jsondata and jsondata.tickets are valid
    if(jsonData && jsonData.tasks){

        //Iterate through task data
        jsonData.tasks.forEach(task => {
            // Create a div Tag for the individual task 
            const taskDiv = document.createElement("div")
            
            // set class for the div tag
            taskDiv.setAttribute("class", "d-flex justify-content-between p-2 border-bottom align-items-center")

            // create a div tag to hold the task input
            const taskInputDiv = document.createElement("div")

            // set the css class for the task div
            taskInputDiv.setAttribute("class", "form-check text-start")

            // create the task input
            const taskTitle = document.createElement("input")

            // Set the css class for the task input
            taskTitle.setAttribute("class", "form-check-input")

            // Set the input type for the task input to radio button
            taskTitle.setAttribute("type", "radio")

            // Set the name  for the task input to radio button
            taskTitle.setAttribute("name", "taskChoice")

            // Create the label for for the input
            const taskLabel = document.createElement("label")

            // Set the css for the label
            taskLabel.setAttribute("class", "form-check-label")
            
            // Set label content
            taskLabel.textContent = `${task.title}`

            // add label and input to the the task input div containter
            taskInputDiv.appendChild(taskTitle)
            taskInputDiv.appendChild(taskLabel)

            // Create a span tag for the task status
            const taskStatus = document.createElement("span")
            // Set the css for span tag with a conditon if to switch class based on the status
            taskStatus.setAttribute("class", `badge ${task.status == "Urgent" ? "text-bg-warning" : task.status == "New" ? "text-bg-success" : "text-bg-secondary"}`)
            // Set task status content
            taskStatus.textContent = `${task.status}`

            // add task input containter and status to task div containter
            taskDiv.appendChild(taskInputDiv)
            taskDiv.appendChild(taskStatus)
            
            // Add task div tag for each task to the task card.
            taskDetails.appendChild(taskDiv)
        });
    }else{
        // if no task or no json data show
        console.log("NO Task")
    }
}