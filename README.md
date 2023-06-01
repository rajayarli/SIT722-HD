# SIT323_737-2023-T1-11.2HD ReadMe

## Description
This repository contains the source code and deployment instructions for the SIT323_737-2023-T1-11.2HD project. The project consists of multiple microservices that make up a weather application.

## Deployment

### Build and Push Docker Images

To deploy the application, follow the steps below:

```shell
docker build -t gcr.io/hd-weather/weatherapp-gateway:latest .
docker push gcr.io/hd-weather/weatherapp-gateway:latest

docker build -t gcr.io/hd-weather/weatherapp-weatherservice:latest .
docker push gcr.io/hd-weather/weatherapp-weatherservice:latest

docker build -t gcr.io/hd-weather/weatherapp-geo-service:latest .
docker push gcr.io/hd-weather/weatherapp-geo-service:latest

docker build -t gcr.io/hd-weather/weatherapp-user-service:latest .
docker push gcr.io/hd-weather/weatherapp-user-service:latest

docker build -t gcr.io/hd-weather/weatherapp-notification-service:latest .
docker push gcr.io/hd-weather/weatherapp-notification-service:latest
```

     
##  Create a Google Kubernetes Engine cluster using the following command:
```shell
      gcloud container clusters create-auto hello-cluster --region=us-west2
```
##  Set up credentials for the cluster using the following command:
```shell
      gcloud container clusters get-credentials hello-cluster --region=us-west2
```
##  Expose the deployments as LoadBalancer services using the following commands:
```shell
      kubectl expose deployment weather-gateway --type LoadBalancer --port 80 --target-port 4000
      kubectl expose deployment geo-service-deployment --type LoadBalancer --port 80 --target-port 3002
      kubectl expose deployment weather-service-deployment --type LoadBalancer --port 80 --target-port 3001
      kubectl expose deployment user-service-deployment --type LoadBalancer --port 80 --target-port 4001
      kubectl expose deployment weather-notification-deployment --type LoadBalancer --port 80 --target-port 3003
 ```
##  Service Information
The following is a list of services and their corresponding IP addresses and ports:

 | Service                         | Type         | Cluster-IP    | External-IP    | Port(s)          | Age     |
| ------------------------------- | ------------ | ------------- | -------------- | ---------------- | ------- |
| geo-service-deployment          | LoadBalancer | 10.95.2.33    | 34.94.213.16   | 80:31703/TCP     | 2m11s   |
| kubernetes                      | ClusterIP    | 10.95.0.1     | <none>         | 443/TCP          | 14m     |
| user-service-deployment         | LoadBalancer | 10.95.2.96    | 34.102.77.210  | 80:30722/TCP     | 3m      |
| weather-gateway                 | LoadBalancer | 10.95.1.108   | 35.236.29.194  | 80:32283/TCP     | 49s     |
| weather-notification-deployment | LoadBalancer | 10.95.2.132   | 34.94.6.138    | 80:30185/TCP     | 5m4s    |
| weather-service-deployment      | LoadBalancer | 10.95.1.103   | 34.102.106.59  | 80:30245/TCP     | 3m48s   |

##  Additional Notes:
Make sure you have Docker installed and configured on your system.
Ensure that you have the necessary permissions and credentials to deploy the application.
Replace the IP addresses and ports in the provided examples with the actual values specific to your deployment.
For any issues or questions, please contact the project team.

## final changes


