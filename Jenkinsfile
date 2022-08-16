pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'curl -fsSL https://deb.nodesource.com/setup_14.x | bash -'
        sh 'apt-get install -y nodejs'
        sh 'node -v'
        sh 'npm install -g @angular/cli'
        sh 'npm install'
      }
    }
    stage('编译') {
      steps {
        sh 'echo "export const environment = {production: true, external_api_url: \'https://api.apphub.libms.top\'};" > src/environments/environment.prod.ts'
        sh 'ng build --configuration production'
      }
    }
    stage('上传到 COS Bucket') {
      steps {
        sh 'wget https://aliyuncli.alicdn.com/aliyun-cli-linux-latest-amd64.tgz'
        sh 'tar xzvf aliyun-cli-linux-latest-amd64.tgz'
        sh 'chmod 755 aliyun'
        sh './aliyun configure set --profile akProfile --mode AK --region cn-hangzhou --access-key-id ${AccessKeyId} --access-key-secret ${AccessKeySecret}'
        sh './aliyun oss sync dist/apphub oss://apphub-web/ -f'
      }
    }
  }
}