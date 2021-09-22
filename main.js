document.getElementById('projectInputForm').addEventListener('submit', saveProject);

function saveProject(e) {
  let projectDesc = document.getElementById('projectDescInput').value;
  let projectYear = document.getElementById('projectAssignedYear').value;
  let projectSeverity = document.getElementById('projectSeverityInput').value;
  let projectAssignedTo = document.getElementById('projectAssignedToInput').value;
  let projectId = chance.guid();
  let projectStatus = 'Open';

  const project = {
    id: projectId,
    description: projectDesc,
    severity: projectSeverity,
    assignedTo: projectAssignedTo,
    year: projectYear,
    status: projectStatus
  }

  if (localStorage.getItem('projects') == null) {
    let projects = [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  } else {
    let projects = JSON.parse(localStorage.getItem('projects'));
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  document.getElementById('projectInputForm').reset();

  fetchProjects();

  e.preventDefault();
}

function setStatusClosed(id) {
  let projects = JSON.parse(localStorage.getItem('projects'));

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects[i].status = 'Closed';
    }
  }

  localStorage.setItem('projects', JSON.stringify(projects));

  fetchProjects();
}

function deleteProject(id) {
  let projects = JSON.parse(localStorage.getItem('projects'));

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects.splice(i, 1);
    }
  }

  localStorage.setItem('projects', JSON.stringify(projects));

  fetchProjects();
}

function fetchProjects(id) {
  let projects = JSON.parse(localStorage.getItem('projects'));
  let projectsList = document.getElementById('projectsList');

  projectsList.innerHTML = '';

  for (let i = 0; i < projects.length; i++) {
    let id = projects[i].id;
    let desc = projects[i].description;
    let severity = projects[i].severity;
    let year = projects[i].year
    let assignedTo = projects[i].assignedTo;
    let status = projects[i].status;

    function submitAlert() {
      alert('Please confirm final submission of project')
      submitAlert()
    }



    projectsList.innerHTML +=   '<div class="well">'+
                              '<h6>Project ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+

                              '<p><span class="glyphicon glyphicon-file"></span> ' + assignedTo + year + severity + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-success">Complete</a> '+
                              '<a href="#" onclick="deleteProject(\''+id+'\')" class="btn btn-danger">Delete</a> '+
                              '<a href="javascript: onclick(submitAlert())" class="btn btn-warning">Submit</a>'+
                              '</div>';
  }
}
