pipeline {
  agent any
  environment {
        HOME = '.'
  }
  stages {
    stage('Test') {
      agent {
        docker {
          image 'node:12.18.3-alpine'
        }
      }
      steps {
        sh 'npm install'
        sh 'npm run test -- --watchAll=false'
      }
    }
    stage('Build') {
      steps {
        sh 'ls'
        sh 'docker image build -t igi-react-client:latest .'
        sh 'docker container rm -f igi-react-client-container | echo true'
        sh 'docker container run -d -p 8888:80 --name igi-react-client-container igi-react-client'
      }
    }
  }
}
