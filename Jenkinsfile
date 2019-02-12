pipeline{
    agent any
    stages{
        stage("AGen"){
            steps{
                sh'''
                 zip ${BUILD_NUMBER}-Artifacts.zip * -x Jenkinsfile
                 '''
            }
        }
        stage("S3Upload"){
             steps{
                 s3Upload consoleLogLevel: 'INFO', 
                          dontWaitForConcurrentBuildCompletion: false, 
                          entries: [[
                                bucket: 'chandunodejs/Artifacts',
                                excludedFile: '', 
                                flatten: false, 
                                gzipFiles: false, 
                                keepForever: false, 
                                managedArtifacts: false, 
                                noUploadOnFailure: true, 
                                selectedRegion: 'us-east-2', 
                                showDirectlyInBrowser: false, 
                                sourceFile: '${BUILD_NUMBER}-Artifacts.zip', 
                                storageClass: 'STANDARD', 
                                uploadFromSlave: false, 
                                useServerSideEncryption: false
                                ]], 
                            pluginFailureResultConstraint: 'FAILURE', 
                            profileName: 'Testing', 
                            userMetadata: []
             }
        }
        stage("Deploy"){
            steps{
                    deployLambda(
                            [
                                alias: 'version-${BUILD_NUMBER}',
                                artifactLocation: 's3://<bucketname>/Artifacts/${BUILD_NUMBER}-Artifacts.zip',
                                awsRegion: 'us-east-2', 
                                deadLetterQueueArn: '', 
                                description: '', 
                                environmentConfiguration: [kmsArn: ''], 
                                functionName: 'NodeApp', 
                                handler: 'index.handler', 
                                memorySize: '128', 
                                role: 'arn:aws:iam::<Accountnumber>:role/lambda_basic_execution', 
                                runtime: 'nodejs8.10', 
                                securityGroups: '', 
                                subnets: '', 
                                timeout: '10', 
                                updateMode: 'full', 
                                useInstanceCredentials: 'true'
                            ])

            }
        }
       
    }
}
