                                       🚀 Quick Start Guide (User Manual)


Follow these steps to deploy and run the RLI Employee Management System on your server (like AWS EC2) or local machine.


1. Clean Previous Docker Data (Optional but recommended)

  docker system prune -a --volumes -f


Why we use this: This removes all unused Docker containers, networks, images, and volumes. It frees up disk space and ensures you are starting with a completely fresh environment without cache conflicts.

2. Download the Project

  git clone <https://github.com/debugwithshiltu/rli-employee-management.git>


  Why we use this: This pulls the latest source code of the project directly from GitHub onto your server.

3. Navigate into the Project Folder


  cd rli-employee-management


  Why we use this: You must be inside the root directory of the project to run the configuration files (like `docker-compose.yml`).

4. Build and Start the Application


  docker compose up --build -d


  Why we use this: This reads the `docker-compose.yml` file, builds the custom images for the Frontend and Backend, and starts the database in the background (`-d` means detached mode).

5. Access the Web Dashboard

  Open your web browser and navigate to:
  
  
  <http://54.221.63.205>
  
  
  *(Note: Replace `54.221.63.205` with your server's current Public IP address or `localhost` if running locally).*Why we use this: Nginx is exposing port 80, so going to this HTTP address loads the user interface and connects you to the live application.

6. Monitor and Troubleshoot (Logs)


  docker compose logs -f
  
  
  Why we use this: This displays the live, real-time console output from all your running containers (Database, Backend API, and Nginx). It is highly useful for verifying that everything started correctly or finding the cause of any errors. Press `Ctrl+C` to exit the logs.
