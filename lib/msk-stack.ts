import * as cdk from '@aws-cdk/core';
import * as msk from '@aws-cdk/aws-msk'
import * as ec2 from '@aws-cdk/aws-ec2'


export class MskStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const clusterVpc = new ec2.Vpc(this, 'clusterVpc', {
      cidr: '10.0.0.0/16',
      maxAzs: 3,
      subnetConfiguration: [
        {
        cidrMask: 24,
        name: 'ingress',
        subnetType: ec2.SubnetType.PUBLIC,
      },
      {
        cidrMask: 24,
        name: 'internal',
        subnetType: ec2.SubnetType.ISOLATED,
      }
      ]
    });

    //TODO : add ingress rule with specific IP

    const subnetsIds = clusterVpc.publicSubnets.map(subnet=>subnet.subnetId);

    const kafka = new msk.CfnCluster(this,'kafkacluster',{
      clusterName:'test-cluster',
      numberOfBrokerNodes:3,
      kafkaVersion:'2.2.1',
      encryptionInfo:{
        encryptionInTransit:{
          clientBroker : 'TLS_PLAINTEXT'
        }
      },
      brokerNodeGroupInfo:{
        instanceType:'kafka.m5.large',
        clientSubnets:subnetsIds,
        storageInfo:{
          ebsStorageInfo:{
            volumeSize:100
          }
        }
      } 
    })
   
  }
}

//bin/kafka-topics.sh --create --zookeeper z-3.test-cluster.reldhe.c4.kafka.us-east-1.amazonaws.com:2181 --replication-factor 3 --partitions 1 --topic test

//./kafka-topics.sh --describe --zookeeper  z-3.test-cluster.reldhe.c4.kafka.us-east-1.amazonaws.com:2181 --topic test
