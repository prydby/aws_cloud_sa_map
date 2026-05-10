// AWS SAA-C03 study data — all sections as hierarchical mind map trees.
window.AWS_DATA = { sections: {} };

// ============================================================
// 1. SCALING
// ============================================================
window.AWS_DATA.sections.scaling = {
  title: "Scaling",
  icon: "📈",
  color: "#ff9900",
  summary: "ELB types, cross-zone LB, sticky sessions, SSL/TLS, ASG, scaling policies, lifecycle hooks.",
  root: {
    name: "Scaling",
    children: [
      {
        name: "ELB (Elastic Load Balancer)",
        children: [
          {
            name: "ALB (Application LB)",
            children: [
              { name: "Layer 7 (Application)" },
              { name: "Target groups", children: [
                { name: "EC2 instances" },
                { name: "ECS tasks" },
                { name: "Lambda functions" },
                { name: "Private IP addresses" }
              ]},
              { name: "Listeners + rules (route to different TGs)" },
              { name: "Health checks at TG level (HTTP/HTTPS)" },
              { name: "Cross-zone LB: ON by default" },
              { name: "Cannot attach Elastic IP" },
              { name: "Must be in public subnet" },
              { name: "Supports gRPC" },
              { name: "Supports Weighted Target Group routing" }
            ]
          },
          {
            name: "NLB (Network LB)",
            children: [
              { name: "Layer 4 (Transport)" },
              { name: "Extreme performance — millions req/sec" },
              { name: "TCP and UDP" },
              { name: "One static IP per AZ (can be Elastic IP)" },
              { name: "Target groups", children: [
                { name: "EC2 instances" },
                { name: "Private IP addresses" },
                { name: "ALBs" }
              ]},
              { name: "Health checks: TCP / HTTP / HTTPS" },
              { name: "Cross-zone LB: OFF by default" }
            ]
          },
          {
            name: "GWLB (Gateway LB)",
            children: [
              { name: "Layer 3 (Network)" },
              { name: "Routes traffic to 3rd-party virtual appliances (e.g. security)" },
              { name: "Uses GENEVE protocol on port 6081" },
              { name: "Target groups", children: [
                { name: "EC2 instances" },
                { name: "Private IP addresses" }
              ]},
              { name: "Cross-zone LB: OFF by default" }
            ]
          },
          {
            name: "Cross-zone LB",
            children: [
              { name: "Distributes traffic evenly across TGs in different AZs" }
            ]
          },
          { name: "ELBs have security groups too" },
          { name: "ELBs are region bound" },
          {
            name: "Sticky Sessions",
            children: [
              { name: "Same client always routed to same instance" },
              { name: "Supported: CLB, ALB, NLB" },
              { name: "ALB uses cookies with controllable expiration" }
            ]
          },
          {
            name: "SSL / TLS",
            children: [
              { name: "SNI — extension of TLS; client specifies domain on a single endpoint" }
            ]
          },
          {
            name: "Connection Draining / Deregistration Delay",
            children: [
              { name: "Allows in-flight requests to finish before deregister" },
              { name: "New requests routed elsewhere" },
              { name: "0–3600 sec (default 300)" },
              { name: "Disable by setting to 0" }
            ]
          }
        ]
      },
      {
        name: "ASG (Auto Scaling Group)",
        children: [
          { name: "Uses Launch Templates to manage EC2" },
          { name: "Scales via scaling policy" },
          { name: "Can use CloudWatch alarms as triggers" },
          { name: "Instances can be put into Standby state (temporarily remove)" },
          {
            name: "Scaling Policies",
            children: [
              { name: "Dynamic", children: [
                { name: "Target tracking" },
                { name: "Simple / Step scaling" }
              ]},
              { name: "Scheduled scaling" },
              { name: "Predictive scaling" }
            ]
          },
          {
            name: "Launch Template",
            children: [
              { name: "Only Launch Template can mix instance types" },
              { name: "Mix On-Demand + Spot for desired scale/perf/cost" }
            ]
          },
          {
            name: "Termination Policy (in order)",
            children: [
              { name: "1. Based on instance allocation strategy" },
              { name: "2. Oldest Launch Configuration" },
              { name: "3. Oldest Launch Template" },
              { name: "4. Next Billing Hour" }
            ]
          },
          {
            name: "Instance States",
            children: [
              { name: "Pending" },
              { name: "InService" },
              { name: "Terminating" },
              { name: "Terminated" },
              { name: "Standby" }
            ]
          },
          {
            name: "Lifecycle Hooks",
            children: [
              { name: "autoscaling:EC2_INSTANCE_LAUNCHING" },
              { name: "autoscaling:EC2_INSTANCE_TERMINATING" }
            ]
          },
          {
            name: "Cooldown Period",
            children: [
              { name: "Prevents launching/terminating before last activity takes effect" },
              { name: "Default 300 sec (5 min)" }
            ]
          }
        ]
      }
    ]
  }
};

// ============================================================
// 2. DATABASES
// ============================================================
window.AWS_DATA.sections.databases = {
  title: "Databases",
  icon: "🗄️",
  color: "#3b48cc",
  summary: "DynamoDB, RDS, Aurora, ElastiCache, Neptune, DocumentDB, Keyspaces.",
  root: {
    name: "Databases",
    children: [
      {
        name: "DynamoDB",
        children: [
          { name: "Serverless" },
          { name: "Fully managed NoSQL, HA, multi-AZ replicated" },
          { name: "Millions req/sec, trillions of rows, 100s of TB" },
          {
            name: "Data Types",
            children: [
              { name: "Scalar: String, Number, Binary, Boolean, Null" },
              { name: "Document: List, Map" },
              { name: "Set: String Set, Number Set, Binary Set" }
            ]
          },
          {
            name: "Capacity Modes",
            children: [
              { name: "Provisioned" },
              { name: "On-demand" }
            ]
          },
          {
            name: "DynamoDB Accelerator (DAX)",
            children: [
              { name: "Managed in-memory cache for DynamoDB" },
              { name: "Solves read congestion via caching" },
              { name: "Microsecond latency for cached data" },
              { name: "Default TTL 5 minutes" }
            ]
          },
          {
            name: "DynamoDB Streams",
            children: [
              { name: "Time-ordered sequence of item changes (insert/update/delete)" }
            ]
          },
          {
            name: "Global Tables",
            children: [
              { name: "Low-latency access across multiple regions" },
              { name: "Active-active replication" },
              { name: "READ + WRITE in any region" },
              { name: "Prerequisite: DynamoDB Streams enabled" }
            ]
          },
          {
            name: "TTL",
            children: [{ name: "Delete items after expiry timestamp" }]
          },
          {
            name: "Backup",
            children: [
              { name: "Continuous via Point-in-Time Recovery (PITR)" },
              { name: "On-demand backups" }
            ]
          },
          {
            name: "Integration with S3",
            children: [
              { name: "Import/export tables to/from S3" },
              { name: "Must enable PITR" }
            ]
          },
          {
            name: "Partition Key Cardinality",
            children: [{ name: "Use high-cardinality partition keys" }]
          }
        ]
      },
      {
        name: "RDS",
        children: [
          { name: "Storage scales automatically within max threshold" },
          { name: "Auto-scale triggers", children: [
            { name: "Free storage < 10% of allocated" },
            { name: "Low storage for ≥ 5 min" },
            { name: "6 hrs since last modification" }
          ]},
          {
            name: "Read Replicas",
            children: [
              { name: "Up to 15" },
              { name: "Within AZ, cross-AZ, or cross-region" },
              { name: "Replication is ASYNC (possible lag)" },
              { name: "Each replica can be promoted to its own DB" },
              { name: "Each replica has its own endpoint" },
              { name: "No data transfer fees within same region" },
              { name: "Can be used for DR (async)" }
            ]
          },
          {
            name: "Multi-AZ",
            children: [
              { name: "For DR, not for read scaling" },
              { name: "Same DNS endpoint across replicas" },
              { name: "Automatic failover to standby" },
              { name: "SYNC replication" }
            ]
          },
          {
            name: "RDS Custom",
            children: [
              { name: "Oracle / MS SQL Server with OS + DB customization" },
              { name: "RDS: full management by AWS" },
              { name: "RDS Custom: full admin on underlying OS/DB" },
              { name: "Can SSH into the underlying EC2" }
            ]
          },
          {
            name: "Backup",
            children: [
              { name: "Automated", children: [
                { name: "Daily full backup" },
                { name: "Transaction logs backed every 5 min" },
                { name: "Restore to any point-in-time (last 5 min)" },
                { name: "Retention 1–35 days; 0 disables" }
              ]},
              { name: "Manual snapshot — retention as long as user wants" },
              { name: "Can create backups/snapshots in Multi-AZ" },
              { name: "Stopped RDS still charges" }
            ]
          },
          {
            name: "Encrypt an un-encrypted RDS",
            children: [
              { name: "1. Take a snapshot" },
              { name: "2. Copy as encrypted snapshot" },
              { name: "3. Restore from encrypted snapshot" },
              { name: "4. Terminate original" }
            ]
          },
          {
            name: "Enhanced Monitoring",
            children: [
              { name: "Real-time OS-level metrics" },
              { name: "See how processes/threads use CPU" }
            ]
          },
          {
            name: "IAM DB Authentication",
            children: [
              { name: "MySQL and PostgreSQL" },
              { name: "Token string instead of password" },
              { name: "Valid 15 minutes" }
            ]
          },
          {
            name: "SSL encryption",
            children: [
              { name: "Force SSL" },
              { name: "Encrypt from client side" }
            ]
          },
          {
            name: "RDS Proxy (RDS + Aurora)",
            children: [
              { name: "Serverless, autoscaling, HA (multi-AZ)" },
              { name: "Never publicly accessible (VPC only)" }
            ]
          }
        ]
      },
      {
        name: "Aurora",
        children: [
          { name: "AWS proprietary" },
          { name: "Auto-grow storage in 10 GB increments, up to 128 TB" },
          { name: "Up to 15 replicas" },
          { name: "Sub-10 ms replica lag" },
          { name: "~20% more cost than RDS" },
          { name: "Shared volume: 6 copies across 3 AZs" },
          { name: "Self-healing, peer-to-peer replication" },
          { name: "Master (RW) + up to 15 read replicas" },
          { name: "1 writer endpoint + 1 LB reader endpoint" },
          { name: "Cross-region replication support" },
          { name: "Read replica auto-scaling" },
          {
            name: "Custom Endpoint",
            children: [
              { name: "From subset of read replicas" },
              { name: "Great for analytics / dev-test env" }
            ]
          },
          {
            name: "Aurora Serverless",
            children: [
              { name: "Auto DB instantiation + scaling based on usage" },
              { name: "Pay per second" },
              { name: "Cannot change provisioned → serverless" }
            ]
          },
          {
            name: "Global Aurora",
            children: [
              { name: "1 primary RW region" },
              { name: "Up to 5 secondary RO regions" },
              { name: "< 1 sec replication lag" },
              { name: "Up to 16 read replicas per secondary region" },
              { name: "DR region promote RTO < 1 minute" }
            ]
          },
          {
            name: "DB Cloning",
            children: [
              { name: "Faster than snapshot-restore" },
              { name: "Initially shares storage volume; new storage on writes" },
              { name: "Good for staging DB from prod" }
            ]
          },
          {
            name: "Backup",
            children: [
              { name: "Automated 1–35 days (can't disable)" },
              { name: "Manual snapshot — retention as long as user wants" }
            ]
          },
          {
            name: "Read replica failover priority",
            children: [
              { name: "1. Tier (smaller number = higher priority)" },
              { name: "2. Size (larger = higher priority)" }
            ]
          },
          {
            name: "Aurora MySQL Native Function",
            children: [
              { name: "Call Lambda from native SQL function / stored procedure on row modify" }
            ]
          },
          {
            name: "IAM DB Authentication",
            children: [
              { name: "MySQL and PostgreSQL" },
              { name: "Token valid 15 minutes" }
            ]
          }
        ]
      },
      {
        name: "ElastiCache",
        children: [
          { name: "Managed Redis or Memcached" },
          { name: "Redis: leaderboards, app cache, geospatial" },
          { name: "Memcached: DB cache, user session store" },
          { name: "Redis sorted sets → leaderboard ranking" },
          { name: "HIPAA-compatible" },
          { name: "Multi-AZ configuration" },
          { name: "Up to 5 read replicas across AZs" }
        ]
      },
      { name: "Neptune", children: [{ name: "Graph DB" }] },
      { name: "DocumentDB", children: [{ name: "AWS service for MongoDB" }] },
      { name: "Keyspaces", children: [{ name: "AWS service for Apache Cassandra" }] }
    ]
  }
};

// ============================================================
// 3. DNS
// ============================================================
window.AWS_DATA.sections.dns = {
  title: "DNS",
  icon: "🌐",
  color: "#e7157b",
  summary: "Route 53 — records, routing policies, hosted zones, failover.",
  root: {
    name: "DNS",
    children: [
      {
        name: "Route 53",
        children: [
          { name: "Highly available, scalable, managed, authoritative DNS" },
          { name: "Only AWS service with 100% availability SLA" },
          {
            name: "Record Types",
            children: [
              { name: "A — IPv4" },
              { name: "AAAA — IPv6" },
              { name: "CNAME — another domain name (NOT root/apex)" },
              { name: "Alias — root/top nodes → AWS resources (extension of A/AAAA)" },
              { name: "NS — name servers for hosted zones" }
            ]
          },
          {
            name: "Name Servers",
            children: [
              { name: "Resolve DNS by looking at hosted zone records" },
              { name: "NS record routes DNS traffic to name servers" }
            ]
          },
          { name: "Cost: $0.50 / month / hosted zone" },
          {
            name: "Hosted Zones",
            children: [
              { name: "Public" },
              { name: "Private (within VPC)" }
            ]
          },
          {
            name: "Routing Policies",
            children: [
              { name: "Simple" },
              { name: "Weighted" },
              { name: "Latency-based" },
              { name: "Failover" },
              { name: "Geolocation" },
              { name: "Geoproximity" },
              { name: "IP-based" },
              { name: "Multi-value" }
            ]
          },
          {
            name: "Failover",
            children: [
              { name: "Active-active" },
              { name: "Active-passive" }
            ]
          },
          {
            name: "S3 Static Website Routing",
            children: [
              { name: "S3 bucket name MUST equal domain name" }
            ]
          }
        ]
      }
    ]
  }
};

// ============================================================
// 4. CONTAINERIZATION
// ============================================================
window.AWS_DATA.sections.containerization = {
  title: "Containerization",
  icon: "📦",
  color: "#1f8acb",
  summary: "ECS, ECR, EKS, App Runner, Elastic Beanstalk.",
  root: {
    name: "Containerization",
    children: [
      {
        name: "ECS",
        children: [
          { name: "Launch Types", children: [
            { name: "EC2" },
            { name: "Fargate" }
          ]},
          { name: "IAM Roles", children: [
            { name: "EC2 Instance Profile" },
            { name: "ECS Task Role" }
          ]},
          { name: "Data Volumes", children: [
            { name: "EBS volumes of each EC2 instance" },
            { name: "Can use EFS" },
            { name: "Fargate + EFS = Serverless" }
          ]},
          { name: "Application Auto Scaling", children: [
            { name: "Auto increase/decrease desired number of ECS tasks" }
          ]},
          { name: "Cluster Capacity Auto Scaling", children: [
            { name: "ECS Cluster Capacity Provider auto-provisions infra for tasks" },
            { name: "Capacity Provider paired with ASG" }
          ]}
        ]
      },
      {
        name: "ECR",
        children: [
          { name: "Store/manage Docker images" },
          { name: "Fully integrated with ECS, backed by S3" }
        ]
      },
      {
        name: "EKS",
        children: [
          { name: "Worker nodes via EC2 or serverless via Fargate" },
          { name: "Node Types", children: [
            { name: "Managed Node Group" },
            { name: "Self-managed Nodes" },
            { name: "Fargate" }
          ]},
          { name: "Data Volumes", children: [
            { name: "EBS" },
            { name: "EFS" },
            { name: "FSx for Lustre" },
            { name: "FSx for NetApp" }
          ]},
          { name: "Karpenter", children: [
            { name: "Auto-adjusts nodes when pods fail or rescheduled" }
          ]},
          { name: "Horizontal Pod Autoscaler (HPA)", children: [
            { name: "Auto scales pods based on CPU utilization" },
            { name: "Requires Kubernetes Metrics Server" }
          ]}
        ]
      },
      {
        name: "ECS Anywhere & EKS Anywhere",
        children: [
          { name: "Extends ECS/EKS to any infra (on-prem, edge, other clouds)" },
          { name: "Orchestration layer for hybrid / multi-cloud" }
        ]
      },
      {
        name: "AWS App Runner",
        children: [
          { name: "Fully managed — deploy & scale web apps/APIs from source or image" },
          { name: "No infra experience needed" },
          { name: "Auto build, deploy, scale, HA, LB, encryption" }
        ]
      },
      {
        name: "AWS Elastic Beanstalk",
        children: [
          { name: "PaaS — easy deploy/manage/scale" },
          { name: "Manages infra, allows customization" },
          { name: "Real-time monitoring of app health, resources, logs" }
        ]
      }
    ]
  }
};

// ============================================================
// 5. SERVERLESS
// ============================================================
window.AWS_DATA.sections.serverless = {
  title: "Serverless",
  icon: "⚡",
  color: "#6b47dc",
  summary: "Lambda, API Gateway, Step Functions, Cognito.",
  root: {
    name: "Serverless",
    children: [
      {
        name: "Services",
        children: [
          { name: "Lambda" }, { name: "DynamoDB" }, { name: "Cognito" },
          { name: "API Gateway" }, { name: "S3" }, { name: "SNS and SQS" },
          { name: "Kinesis" }, { name: "Aurora Serverless" },
          { name: "Step Functions" }, { name: "Fargate" }
        ]
      },
      {
        name: "Lambda",
        children: [
          { name: "Pay per request + compute time" },
          { name: "Free tier: 1M requests + 400,000 GB-s" },
          { name: "Outside VPC by default" },
          { name: "If assigned subnet/VPC → creates ENI in subnet" },
          { name: "Can be invoked via Lambda Function URL" },
          {
            name: "Pricing",
            children: [
              { name: "Per call", children: [
                { name: "First 1M free" },
                { name: "$0.20 per 1M thereafter ($0.0000002/req)" }
              ]},
              { name: "Per duration", children: [
                { name: "400,000 GB-s/month free" },
                { name: "400,000 s if 1 GB RAM" },
                { name: "3,200,000 s if 128 MB RAM" },
                { name: "After: $1.00 / 600,000 GB-s" }
              ]}
            ]
          },
          {
            name: "Execution",
            children: [
              { name: "Memory: 128 MB – 10 GB (1 MB increments)" },
              { name: "Max execution: 900 sec (15 min)" },
              { name: "Env variables: 4 KB" },
              { name: "/tmp disk: 512 MB – 10 GB" },
              { name: "Concurrency: 1000 per region (can increase)" }
            ]
          },
          {
            name: "Deployment",
            children: [
              { name: "Zip size: 50 MB" },
              { name: "Uncompressed (code + deps): 250 MB" },
              { name: "Use /tmp for startup loads" },
              { name: "Env variables: 4 KB" }
            ]
          },
          {
            name: "SnapStart for Java",
            children: [
              { name: "Lambda initializes function at publish time" },
              { name: "Snapshot of memory + disk state" },
              { name: "Cached for low-latency access" }
            ]
          },
          {
            name: "Running Container Images",
            children: [
              { name: "Must use AWS-provided base image for Lambda" }
            ]
          }
        ]
      },
      {
        name: "API Gateway",
        children: [
          { name: "Endpoint Types", children: [
            { name: "Edge-optimized" }, { name: "Regional" }, { name: "Private" }
          ]},
          { name: "User Authentication", children: [
            { name: "IAM Roles (internal apps)" },
            { name: "Cognito (external users)" },
            { name: "Custom Authorizer" },
            { name: "Custom Domain Name HTTPS via ACM" }
          ]},
          { name: "Supports API caching and request throttling" }
        ]
      },
      {
        name: "Step Functions",
        children: [
          { name: "Serverless visual workflow to orchestrate Lambda" }
        ]
      },
      {
        name: "AWS Cognito",
        children: [
          { name: "Identity to interact with web/mobile apps" },
          { name: "User Pool", children: [
            { name: "Sign-in functionality for app users" },
            { name: "Serverless user DB for web/mobile" },
            { name: "Integrates with API Gateway + ALB" }
          ]},
          { name: "Identity Pool (Federated Identity)", children: [
            { name: "AWS credentials for users → direct AWS access" },
            { name: "Integrates with Cognito User Pools" },
            { name: "Temporary AWS credentials for 'users'" }
          ]}
        ]
      }
    ]
  }
};

// ============================================================
// 6. DATA ANALYTICS
// ============================================================
window.AWS_DATA.sections.analytics = {
  title: "Data Analytics",
  icon: "📊",
  color: "#00a86b",
  summary: "Athena, Redshift, OpenSearch, EMR, QuickSight, Glue, Lake Formation, MSK.",
  root: {
    name: "Data Analytics",
    children: [
      {
        name: "Athena",
        children: [
          { name: "Serverless query service over S3" },
          { name: "Formats: CSV, JSON, ORC, Avro, Parquet" },
          { name: "$5.00 / TB scanned" },
          { name: "Commonly used with QuickSight" },
          { name: "Federated Query", children: [
            { name: "SQL across relational, non-relational, object, custom sources" },
            { name: "Data Source Connectors run on Lambda" },
            { name: "Store results back in S3" }
          ]},
          { name: "Performance Tips", children: [
            { name: "Use columnar (Parquet / ORC)" },
            { name: "Compress data" },
            { name: "Partition datasets in S3" },
            { name: "Use larger files (>128 MB)" }
          ]}
        ]
      },
      {
        name: "Redshift",
        children: [
          { name: "Based on PostgreSQL but OLAP (data warehouse)" },
          { name: "10x perf vs other DWs; scale to PBs" },
          { name: "Columnar storage + parallel query engine" },
          { name: "Modes", children: [
            { name: "Provisioned Cluster" },
            { name: "Serverless Cluster" }
          ]},
          { name: "Cluster Nodes", children: [
            { name: "Leader Node" },
            { name: "Compute Node" }
          ]},
          { name: "Snapshots & DR", children: [
            { name: "Point-in-time backups to S3 internally" },
            { name: "Restore snapshot to new cluster" },
            { name: "Auto every 8 hrs / 5 GB / scheduled" },
            { name: "Retention 1–35 days" },
            { name: "Manual snapshots supported" },
            { name: "Cross-region snapshots" }
          ]},
          { name: "Data Loading", children: [
            { name: "Kinesis Data Firehose" },
            { name: "S3 via COPY", children: [
              { name: "Without Enhanced VPC Routing" },
              { name: "With Enhanced VPC Routing" }
            ]},
            { name: "EC2 JDBC driver" }
          ]},
          { name: "Redshift Spectrum", children: [
            { name: "Query S3 data without loading it" }
          ]}
        ]
      },
      {
        name: "OpenSearch",
        children: [
          { name: "Successor to ElasticSearch" },
          { name: "Complement DB as search API" },
          { name: "Ingestion: Kinesis Firehose, IoT, CloudWatch Logs" },
          { name: "OpenSearch Dashboards for viz" },
          { name: "Modes", children: [
            { name: "Managed Cluster" },
            { name: "Serverless Cluster" }
          ]}
        ]
      },
      {
        name: "EMR (Elastic MapReduce)",
        children: [
          { name: "Clusters of hundreds of EC2 w/ autoscaling + spot" },
          { name: "Bundled: Spark, HBase, Presto, Flink" },
          { name: "Handles provisioning + config" },
          { name: "Node Types", children: [
            { name: "Master Node" },
            { name: "Core Node" },
            { name: "Task Node" }
          ]},
          { name: "Purchasing Options", children: [
            { name: "On-demand" },
            { name: "Reserved (min 1 yr)" },
            { name: "Spot" }
          ]},
          { name: "Modes", children: [
            { name: "Long running cluster" },
            { name: "Transient cluster" }
          ]}
        ]
      },
      {
        name: "QuickSight",
        children: [
          { name: "Serverless ML-powered BI for interactive dashboards" },
          { name: "SPICE engine: in-memory compute if data imported" },
          { name: "Users/Groups (separate from IAM)" }
        ]
      },
      {
        name: "AWS Glue",
        children: [
          { name: "Managed ETL service" },
          { name: "Job Bookmarks", children: [
            { name: "Prevent re-processing old data" }
          ]},
          { name: "Elastic Views", children: [
            { name: "Combine + replicate data via SQL" },
            { name: "Serverless, no custom code" },
            { name: "Virtual table (materialized view)" }
          ]},
          { name: "DataBrew", children: [{ name: "Prebuilt transformations" }] },
          { name: "Glue Studio", children: [{ name: "GUI for ETL jobs" }] },
          { name: "Streaming ETL", children: [
            { name: "For streaming data" },
            { name: "Built on Spark Structured Streaming" },
            { name: "Works with Kinesis, Kafka, MSK" }
          ]}
        ]
      },
      {
        name: "Lake Formation",
        children: [
          { name: "Build data lake" },
          { name: "Stored in S3" },
          { name: "Built on top of Glue" },
          { name: "Consolidate multi-account data into central datalake" }
        ]
      },
      {
        name: "MSK (Managed Streaming for Kafka)",
        children: [
          { name: "Alternative to Kinesis" },
          { name: "MSK Serverless", children: [
            { name: "Run Kafka without managing capacity" },
            { name: "Auto-provisions + scales compute/storage" }
          ]}
        ]
      },
      {
        name: "AWS Data Exchange",
        children: [{ name: "Find/subscribe to/use 3rd-party data in AWS" }]
      },
      {
        name: "AWS Data Pipeline",
        children: [
          { name: "Automate data movement/transformation across AWS & on-prem" },
          { name: "Complex workflows: scheduling, dependencies, transforms" }
        ]
      }
    ]
  }
};

// ============================================================
// 7. MONITORING
// ============================================================
window.AWS_DATA.sections.monitoring = {
  title: "Monitoring",
  icon: "📡",
  color: "#d63384",
  summary: "CloudWatch, CloudTrail, AWS Config, Trusted Advisor, X-Ray.",
  root: {
    name: "Monitoring",
    children: [
      {
        name: "CloudWatch",
        children: [
          { name: "Metrics", children: [
            { name: "Every AWS service has metrics" },
            { name: "Namespaces (S3, ECS, EC2, ...)" },
            { name: "Dimensions (instance id, env, ...) — up to 30 per metric" },
            { name: "Can create Custom Metrics" }
          ]},
          { name: "Metric Streams", children: [
            { name: "Continual near-real-time stream to Firehose / 3rd party" },
            { name: "Optional filter to subset" }
          ]},
          { name: "Logs", children: [
            { name: "Log groups + log streams" },
            { name: "Expiration policies (never, 1 day – 10 yrs)" },
            { name: "Encrypted by default" },
            { name: "KMS-based encryption with own keys" }
          ]},
          { name: "Agents", children: [
            { name: "Collect logs from EC2 or on-prem servers" }
          ]},
          { name: "Alarms", children: [
            { name: "Trigger notifications on any metric" }
          ]},
          { name: "Insights", children: [
            { name: "Container Insights — ECS, EKS, K8s on EC2, Fargate; agent for K8s" },
            { name: "Lambda Insights — detailed serverless metrics" },
            { name: "Contributor Insights — 'Top-N' from Logs" },
            { name: "Application Insights — auto dashboard to troubleshoot" }
          ]}
        ]
      },
      {
        name: "CloudTrail",
        children: [
          { name: "Governance, compliance, audit" },
          { name: "EventBridge integration to trigger services on events" },
          { name: "Log files encrypted by default" },
          { name: "Events", children: [
            { name: "Management Events" },
            { name: "Data Events" },
            { name: "Insights Events" }
          ]},
          { name: "Retention", children: [
            { name: "90 days in CloudTrail" },
            { name: "Beyond 90 days → log to S3 + Athena" }
          ]}
        ]
      },
      {
        name: "AWS Config",
        children: [
          { name: "Audit + record compliance of AWS resources" },
          { name: "Records configs + changes over time" },
          { name: "Per-region; can aggregate across regions/accounts" },
          { name: "Rules", children: [
            { name: "AWS managed" },
            { name: "Custom" },
            { name: "No free tier — $0.003/config item/region + $0.001/rule eval/region" }
          ]},
          { name: "Resource", children: [
            { name: "View compliance over time" },
            { name: "View config over time" },
            { name: "View CloudTrail API calls over time" }
          ]},
          { name: "Remediation", children: [
            { name: "SSM Automation Documents" },
            { name: "AWS-managed or custom automation docs" },
            { name: "Retry if still non-compliant" }
          ]},
          { name: "Notification", children: [
            { name: "EventBridge on non-compliance" },
            { name: "SNS for config changes + compliance state" }
          ]}
        ]
      },
      {
        name: "AWS Trusted Advisor",
        children: [
          { name: "Optimize cost, perf, security, resilience, scale" },
          { name: "Recommends actions vs best practices" },
          { name: "Service quota checks via Lambda every 24 hrs" }
        ]
      },
      {
        name: "AWS X-Ray",
        children: [
          { name: "Tracks latency, bottlenecks, errors" },
          { name: "Service Map — visualize service relationships, latency, errors" }
        ]
      }
    ]
  }
};

// ============================================================
// 8. DISASTER RECOVERY
// ============================================================
window.AWS_DATA.sections.dr = {
  title: "Disaster Recovery",
  icon: "🛟",
  color: "#d7263d",
  summary: "RPO/RTO, DR strategies, DMS, AWS Backup, ADS, MGN.",
  root: {
    name: "Disaster Recovery",
    children: [
      {
        name: "RPO & RTO",
        children: [
          { name: "RPO — Recovery Point Objective: time between disaster and last backup" },
          { name: "RTO — Recovery Time Objective: time between disaster and recovery" }
        ]
      },
      {
        name: "DR Strategies",
        children: [
          { name: "Backup and Restore", children: [
            { name: "Cheapest" },
            { name: "High RPO, High RTO" }
          ]},
          { name: "Pilot Light", children: [
            { name: "Minimal version of app always running in cloud" }
          ]},
          { name: "Warm Standby", children: [
            { name: "Scaled-down full system always up and running" }
          ]},
          { name: "Hot Site / Multi-Site", children: [
            { name: "Full prod scale running on AWS + on-prem" }
          ]}
        ]
      },
      {
        name: "AWS DMS",
        children: [
          { name: "Heterogeneous + homogeneous migrations" },
          { name: "Must run on EC2 replication instance" },
          { name: "Different engines → use Schema Conversion Tool (SCT)" },
          { name: "Multi-AZ deployment supported" },
          { name: "S3 and Kinesis also valid source/target" },
          { name: "Full load + Change Data Capture (CDC) tasks" }
        ]
      },
      {
        name: "RDS + Aurora DB Migration",
        children: [
          { name: "MySQL", children: [
            { name: "RDS → Aurora", children: [
              { name: "Snapshot restore RDS MySQL → Aurora" },
              { name: "Aurora Read Replica → promote when lag=0" }
            ]},
            { name: "External → Aurora", children: [
              { name: "Backup to S3 and import into Aurora" },
              { name: "mysqldump utility direct" }
            ]},
            { name: "DMS also" }
          ]},
          { name: "PostgreSQL", children: [
            { name: "RDS → Aurora", children: [
              { name: "Snapshot restore RDS PG → Aurora" },
              { name: "Aurora Read Replica → promote when lag=0" }
            ]},
            { name: "External → Aurora", children: [
              { name: "S3 backup + aws_s3 Aurora extension" }
            ]},
            { name: "DMS also" }
          ]}
        ]
      },
      {
        name: "AWS Backup",
        children: [
          { name: "Central + automated backups across AWS" },
          { name: "Cross-region + cross-account" },
          { name: "Supported Services", children: [
            { name: "EC2 / EBS" },
            { name: "S3" },
            { name: "RDS (all engines) / Aurora / DynamoDB" },
            { name: "DocumentDB / Neptune" },
            { name: "EFS / FSx (Lustre & Windows FS)" },
            { name: "Storage Gateway (Volume Gateway)" }
          ]},
          { name: "Features", children: [
            { name: "PITR" },
            { name: "On-demand + scheduled" },
            { name: "Tag-based policies" },
            { name: "Backup Plans" },
            { name: "Backup Vault Lock" }
          ]}
        ]
      },
      {
        name: "ADS & MGN",
        children: [
          { name: "ADS (Application Discovery Service)", children: [
            { name: "Plan migration by collecting on-prem DC info" },
            { name: "Utilization + dependency mapping" },
            { name: "View in AWS Migration Hub" }
          ]},
          { name: "MGN (Application Migration Service)", children: [
            { name: "Successor to CloudEndure Migration / SMS" },
            { name: "Lift-and-shift (rehost)" },
            { name: "Convert physical/virtual/cloud servers → run on AWS natively" },
            { name: "Uses AWS Replication Agent on source servers" }
          ]}
        ]
      }
    ]
  }
};

// ============================================================
// 9. COMPUTE
// ============================================================
window.AWS_DATA.sections.compute = {
  title: "Compute",
  icon: "🖥️",
  color: "#ff6b35",
  summary: "EC2, Outposts, Wavelength.",
  root: {
    name: "Compute",
    children: [
      {
        name: "EC2",
        children: [
          { name: "Storage", children: [
            { name: "EBS" }, { name: "EFS" }, { name: "Instance Store" }
          ]},
          { name: "Instance Types", children: [
            { name: "General Purpose (M, T)" },
            { name: "Compute optimized (C)" },
            { name: "Memory optimized (R)" },
            { name: "Accelerated (G, P)" },
            { name: "Storage optimized (I)" }
          ]},
          { name: "Tenancy", children: [
            { name: "Default" }, { name: "Dedicated" }, { name: "Host" }
          ]},
          { name: "Security Group", children: [
            { name: "Controls ins/outs of instance" },
            { name: "VPC bound" },
            { name: "Can attach to multiple instances" },
            { name: "Allow rules only" },
            { name: "Reference by IP or other SG" },
            { name: "Inbound blocked / outbound allowed by default" }
          ]},
          { name: "Purchasing Options", children: [
            { name: "On-demand" },
            { name: "Reserved" },
            { name: "Saving Plans" },
            { name: "Spot" },
            { name: "Dedicated Hosts" },
            { name: "Dedicated Instances" },
            { name: "Capacity Reservation" }
          ]},
          { name: "Elastic IP", children: [
            { name: "Attach to 1 instance at a time" },
            { name: "5 per account (can request increase)" }
          ]},
          { name: "Placement Groups", children: [
            { name: "Cluster" }, { name: "Spread" }, { name: "Partition" }
          ]},
          { name: "ENI (Elastic Network Interface)", children: [
            { name: "Multiple ENIs per instance — 1 primary private IPv4 + secondary IPv4s" },
            { name: "Bound to specific AZ" },
            { name: "Public IPv4 assigned per subnet IP rule" },
            { name: "One Elastic IP per private IP" }
          ]},
          { name: "Instance Stages", children: [
            { name: "Stop" }, { name: "Terminate" }, { name: "Hibernate" }
          ]},
          { name: "AMI", children: [
            { name: "Sources", children: [
              { name: "Public AMIs" },
              { name: "Custom AMIs" },
              { name: "Marketplace AMIs" }
            ]},
            { name: "Copy across AZs / Regions / Accounts" },
            { name: "Includes snapshots (copied with AMI)" },
            { name: "Copy of encrypted snapshot stays encrypted" }
          ]},
          { name: "Enhanced Networking", children: [
            { name: "ENA (Elastic Network Adapter)" },
            { name: "EFA (Elastic Fabric Adapter)" }
          ]},
          { name: "Automation & Orchestration", children: [
            { name: "AWS Batch" },
            { name: "AWS ParallelCluster" },
            { name: "vCPU-based On-Demand limit per region" }
          ]},
          { name: "EC2 Billing", children: [
            { name: "Pending — NOT billed" },
            { name: "Running — billed" },
            { name: "Stopping — NOT billed" },
            { name: "Terminated — NOT billed" },
            { name: "Stopping (to hibernate) — billed" },
            { name: "Terminated (reserved) — billed" }
          ]}
        ]
      },
      {
        name: "AWS Outposts",
        children: [
          { name: "Extends AWS infra/services/APIs to your on-prem DC / edge" },
          { name: "Physical AWS HW + SW in your location" },
          { name: "Supports EC2, ECS/EKS, RDS, S3, EBS locally" }
        ]
      },
      {
        name: "AWS Wavelength",
        children: [
          { name: "AWS compute/storage at telco 5G edge" },
          { name: "Wavelength Zones in telco DCs connected to 5G" },
          { name: "Process data near users — reduces latency" }
        ]
      }
    ]
  }
};

// ============================================================
// 10. ACCESS CONTROL
// ============================================================
window.AWS_DATA.sections.access = {
  title: "Access Control",
  icon: "🔐",
  color: "#9333ea",
  summary: "IAM, Organizations, Identity Center, Control Tower, RAM, AD, Federation.",
  root: {
    name: "Access Control",
    children: [
      {
        name: "IAM",
        children: [
          { name: "Users → Groups; policies on groups" },
          { name: "Inline policies on users" },
          { name: "Least privilege" },
          { name: "User can be in multiple groups" },
          { name: "Groups contain users only (not groups)" },
          { name: "Admin sets password policy" },
          { name: "AWS CloudShell — not in every region" },
          { name: "Services act on behalf via IAM roles" },
          { name: "Access = explicit Allow only" },
          { name: "MFA Options", children: [
            { name: "Authenticator apps" },
            { name: "U2F (Universal 2nd Factor)" },
            { name: "Security Key", children: [
              { name: "Hardware key fob MFA" },
              { name: "Hardware key fob for AWS GovCloud" }
            ]}
          ]},
          { name: "Security Tools", children: [
            { name: "Credentials report (account level)" },
            { name: "Access Advisor (user level)" }
          ]}
        ]
      },
      {
        name: "AWS Organizations",
        children: [
          { name: "Manage multiple AWS accounts" },
          { name: "Management account + member accounts" },
          { name: "Member accounts in one org only" },
          { name: "Organizational Units (OUs)", children: [
            { name: "Group accounts" },
            { name: "OUs can be nested" }
          ]},
          { name: "Service Control Policies (SCP)", children: [
            { name: "IAM policies on OU/Accounts restrict users + roles" },
            { name: "Do NOT apply to management account" },
            { name: "Do NOT affect service-linked roles" }
          ]}
        ]
      },
      {
        name: "Resource-based Policies vs IAM Roles",
        children: [
          { name: "Some services only IAM role; some have resource-based" },
          { name: "Cross-account: assume role OR resource-based policy" },
          { name: "Trust policy is also resource-based" },
          { name: "With Resource-based Policy", children: [
            { name: "Lambda" }, { name: "SNS" }, { name: "SQS" }, { name: "S3" },
            { name: "API Gateway" }, { name: "KMS" }
          ]},
          { name: "With IAM Roles", children: [
            { name: "Kinesis streams" }, { name: "ECS tasks" }, { name: "..." }
          ]}
        ]
      },
      {
        name: "IAM Permission Boundaries",
        children: [
          { name: "Managed policy sets max perms of IAM entity" },
          { name: "Users and roles only (not groups)" }
        ]
      },
      {
        name: "IAM Identity Center",
        children: [
          { name: "Single sign-on to all AWS accounts, business apps, 3rd party" },
          { name: "Permission sets for account + OU resource access" },
          { name: "Manage users/groups in Identity Center OR external IdP (AD, Okta, Azure AD)" }
        ]
      },
      {
        name: "AWS Control Tower",
        children: [
          { name: "Set up + govern secure multi-account AWS env" },
          { name: "Uses AWS Organizations to create accounts" },
          { name: "Preventive Guardrail — SCPs (e.g., restrict Regions)" },
          { name: "Detective Guardrail — AWS Config (e.g., identify untagged resources)" }
        ]
      },
      {
        name: "AWS RAM (Resource Access Manager)",
        children: [{ name: "Share resources securely with AWS accounts" }]
      },
      {
        name: "AWS Active Directory",
        children: [
          { name: "Managed Microsoft AD", children: [
            { name: "Create own AD in AWS" },
            { name: "Establish 'trust' with on-prem AD" }
          ]},
          { name: "AD Connector", children: [{ name: "Proxy for on-prem AD" }] },
          { name: "Simple AD", children: [
            { name: "AWS managed" },
            { name: "Cannot join on-prem ADs" }
          ]}
        ]
      },
      {
        name: "AWS Federated Access",
        children: [
          { name: "External IdPs get AWS access without IAM users" },
          { name: "Types", children: [
            { name: "Federation with IAM Identity Center" },
            { name: "Federation with IAM" },
            { name: "Federation with Cognito identity pools" }
          ]}
        ]
      }
    ]
  }
};

// ============================================================
// 11. CDN
// ============================================================
window.AWS_DATA.sections.cdn = {
  title: "CDN",
  icon: "🌍",
  color: "#00b8a9",
  summary: "CloudFront, Global Accelerator, OAI/OAC, DDoS mitigation.",
  root: {
    name: "CDN",
    children: [
      {
        name: "CloudFront",
        children: [
          { name: "CDN caching at 216 POPs" },
          { name: "Origins", children: [
            { name: "S3" }, { name: "EC2" }, { name: "ALB" },
            { name: "Any HTTP endpoint" }
          ]},
          { name: "Geo-restriction — allowlist / blocklist by country" },
          { name: "In front of S3 when file < 1 GB" },
          { name: "Field-level encryption for sensitive data" },
          { name: "Multiple origins routed by content type" },
          { name: "Origin group: primary + secondary for HA/failover" },
          { name: "Signed URLs + signed cookies" },
          { name: "Price Classes", children: [
            { name: "All regions (most expensive)" },
            { name: "200 — exclude most expensive regions" },
            { name: "100 — only least expensive" }
          ]},
          { name: "Cache Invalidation", children: [
            { name: "Origin invalidates cache when updated so requests hit origin" }
          ]},
          { name: "CloudFront Functions", children: [
            { name: "Modify viewer req/resp" },
            { name: "Sub-ms startup, millions req/sec" },
            { name: "Native, code inside CloudFront" },
            { name: "JavaScript only" }
          ]},
          { name: "Lambda@Edge", children: [
            { name: "Scales to 1000s req/sec" },
            { name: "Modify CloudFront req/resp" },
            { name: "Author in one region; replicated to POPs" }
          ]},
          { name: "Origin Access Identity (OAI)", children: [
            { name: "Identity of a CloudFront distribution" },
            { name: "Origins use OAI in access policy" },
            { name: "Cannot set OAI if S3 is website endpoint" }
          ]},
          { name: "Origin Access Control (OAC)", children: [
            { name: "Preferred over OAI for restricting S3 origin" },
            { name: "Only designated distributions can access S3" }
          ]},
          { name: "DDoS Mitigation", children: [
            { name: "Edge services — CloudFront, Global Accelerator, Route 53" }
          ]}
        ]
      },
      {
        name: "Global Accelerator",
        children: [
          { name: "2 anycast IPs created" },
          { name: "Anycast IPs → edge → app endpoint via internal AWS network" },
          { name: "Endpoint weights for traffic distribution" },
          { name: "Good for gaming, IoT, VoIP" }
        ]
      },
      {
        name: "CloudFront vs Global Accelerator",
        children: [
          { name: "CloudFront caches content at edge" },
          { name: "Global Accelerator uses TCP/UDP edge routing — NO caching" },
          { name: "Both have DDoS protection via AWS Shield" }
        ]
      }
    ]
  }
};

// ============================================================
// 12. STORAGE
// ============================================================
window.AWS_DATA.sections.storage = {
  title: "Storage",
  icon: "💾",
  color: "#ffa726",
  summary: "S3, Snow Family, FSx, Storage Gateway, Transfer Family, DataSync.",
  root: {
    name: "Storage",
    children: [
      {
        name: "S3",
        children: [
          { name: "Max object 5 TB" },
          { name: "> 5 GB → multi-part upload" },
          { name: "Block public access at account level" },
          { name: "Versioning", children: [
            { name: "Preserves previous versions on overwrite" },
            { name: "Delete marks rather than truly deletes" },
            { name: "Once enabled, can only suspend (not disable)" }
          ]},
          { name: "Replication", children: [
            { name: "Rule at source bucket" },
            { name: "Source + destination must have versioning" },
            { name: "Only NEW objects replicate" },
            { name: "Use S3 Batch Replication for existing/failed" },
            { name: "Cross-region supported" }
          ]},
          { name: "Storage Classes", children: [
            { name: "Standard" },
            { name: "Standard IA — once/month access" },
            { name: "One-Zone IA — once/month access" },
            { name: "Glacier Instant Retrieval", children: [
              { name: "Ms retrieval" },
              { name: "Once/quarter access" },
              { name: "Min storage 90 days" }
            ]},
            { name: "Glacier Flexible Retrieval", children: [
              { name: "Expedited 1-5 min / Standard 3-5 hr / Bulk 5-12 hr" },
              { name: "Min storage 90 days" }
            ]},
            { name: "Glacier Deep Archive", children: [
              { name: "Standard 12 hr / Bulk 48 hr" },
              { name: "Min storage 180 days" }
            ]},
            { name: "Intelligent Tiering", children: [
              { name: "Frequent access" },
              { name: "Infrequent — 30 days untouched" },
              { name: "Archive instant — 90 days" },
              { name: "Archive access (opt) — 90–700+ days" },
              { name: "Deep archive (opt) — 180–700+ days" }
            ]}
          ]},
          { name: "Lifecycle Rules / Policies", children: [
            { name: "Transition — move between classes" },
            { name: "Expiration — delete expired objects" },
            { name: "Object-level rules" }
          ]},
          { name: "Requester Pay", children: [
            { name: "Requester pays network costs" },
            { name: "Requester must be authenticated IAM user" },
            { name: "Must include x-amz-request-payer on request" }
          ]},
          { name: "Event Notifications", children: [
            { name: "Send to SNS, SQS (standard only) or Lambda" },
            { name: "Receivers need IAM policy for S3 notifications" }
          ]},
          { name: "Performance", children: [
            { name: "Per prefix: 3,500 PUT/COPY/POST/DELETE/s, 5,500 GET/HEAD/s" },
            { name: "4 prefixes → 22K GET/HEAD + 14K writes per sec" },
            { name: "Optimize", children: [
              { name: "Multi-part upload" },
              { name: "Transfer Acceleration" },
              { name: "Byte-range fetches" }
            ]}
          ]},
          { name: "Batch Operations", children: [
            { name: "Bulk ops via single request" },
            { name: "List: S3 Inventory" },
            { name: "Filter: S3 Select" },
            { name: "Process: S3 Batch Operation" }
          ]},
          { name: "Encryption", children: [
            { name: "Server-side (SSE)", children: [
              { name: "SSE-S3 — AWS managed key" },
              { name: "SSE-KMS — KMS key" },
              { name: "SSE-C — customer provided key" }
            ]},
            { name: "Client-side (CSE)" }
          ]},
          { name: "CORS", children: [{ name: "Required for browser access" }] },
          { name: "MFA Delete", children: [
            { name: "Only root can enable/disable" }
          ]},
          { name: "Access Logs", children: [
            { name: "Detailed records of requests — who, where, how" }
          ]},
          { name: "Presigned URLs", children: [
            { name: "Time-limited temporary access to an object" }
          ]},
          { name: "Glacier Vault Lock", children: [
            { name: "WORM model" },
            { name: "Policy immutable after set" },
            { name: "Object cannot be deleted once moved in" }
          ]},
          { name: "S3 Object Lock", children: [
            { name: "WORM model" },
            { name: "Requires versioning" },
            { name: "Block version delete for a period" }
          ]},
          { name: "Access Points", children: [
            { name: "Each AP → a bucket" },
            { name: "Own DNS names" },
            { name: "Internet or VPC origin" },
            { name: "Own policy — keeps bucket policy simple" }
          ]},
          { name: "Object Lambda Access Points", children: [
            { name: "Lambda modifies S3 object before returning to AP" }
          ]}
        ]
      },
      {
        name: "AWS Snow Family",
        children: [
          { name: "Snowcone + Snowball Edge — offline data migration" },
          { name: "Order → load data → ship back → AWS transfers to S3" },
          { name: "Snowcone — 8 TB HDD / 14 TB SSD — TBs scale" },
          { name: "Snowball Edge — 80 TB / 210 TB — PBs scale" },
          { name: "Snowball Edge — storage clustering" },
          { name: "Edge compute — Lambda or EC2 at the edge" },
          { name: "Snowcone — 2 CPU, 4 GB RAM" },
          { name: "Snowball Edge — compute- or storage-optimized" },
          { name: "Snowball cannot transfer directly to S3 Glacier" },
          { name: "Snowmobile — PBs–EBs; container-sized trucks" }
        ]
      },
      {
        name: "AWS FSx",
        children: [
          { name: "Managed high-perf file systems" },
          { name: "Types", children: [
            { name: "Lustre" },
            { name: "Windows File Server" },
            { name: "NetApp ONTAP" },
            { name: "openZFS" }
          ]}
        ]
      },
      {
        name: "AWS Storage Gateway",
        children: [
          { name: "Bridges on-prem ↔ cloud data" },
          { name: "Types", children: [
            { name: "S3 File Gateway" },
            { name: "FSx File Gateway" },
            { name: "Volume Gateway (cached or stored)" },
            { name: "Tape Gateway" }
          ]}
        ]
      },
      {
        name: "AWS Transfer Family",
        children: [
          { name: "Managed file transfer into/out of S3 or EFS" },
          { name: "Supported protocols", children: [
            { name: "FTP" },
            { name: "FTPS (over SSL)" },
            { name: "SFTP" }
          ]}
        ]
      },
      {
        name: "AWS DataSync",
        children: [
          { name: "Move large amounts of data — scheduled agent tasks" },
          { name: "On-prem / other clouds ↔ AWS; AWS ↔ AWS" },
          { name: "Only AWS service that can transfer directly to S3 Glacier" },
          { name: "Supported", children: [
            { name: "S3" }, { name: "S3 Glacier" }, { name: "EFS" }, { name: "FSx" }
          ]}
        ]
      }
    ]
  }
};

// ============================================================
// 13. APPLICATION INTEGRATION / MESSAGING
// ============================================================
window.AWS_DATA.sections.messaging = {
  title: "App Integration & Messaging",
  icon: "📨",
  color: "#5eb3ff",
  summary: "SQS, SNS, Kinesis, EventBridge, MQ, SWF, AppFlow, AppSync.",
  root: {
    name: "App Integration & Messaging",
    children: [
      {
        name: "SQS",
        children: [
          { name: "Producer/Consumer model" },
          { name: "Standard Queue", children: [
            { name: "Unlimited throughput + unlimited messages" },
            { name: "Default 4 days retention, max 14 days" },
            { name: "Low latency (< 10 ms publish/receive)" },
            { name: "256 KB per message" },
            { name: "Possible duplicates" },
            { name: "Possible out-of-order" },
            { name: "Default visibility 30 s" },
            { name: "No per-message priority" }
          ]},
          { name: "FIFO Queue", children: [
            { name: "300 msg/s (3,000 with batching)" },
            { name: "Exactly-once send (dedupe)" },
            { name: "Ordered processing" },
            { name: "Use dedupe ID + message group ID" }
          ]},
          { name: "Encryption", children: [
            { name: "In-flight HTTPS API" },
            { name: "At-rest KMS" },
            { name: "Client-side" }
          ]},
          { name: "Access Policy — like S3 bucket policy" },
          { name: "Long Polling", children: [
            { name: "Consumer waits for messages 1–20 s (20 preferred)" },
            { name: "ReceiveMessageWaitTimeSeconds > 0" }
          ]},
          { name: "Dead Letter Queues", children: [
            { name: "Target for unprocessable source messages" }
          ]},
          { name: "Delay Queue", children: [
            { name: "Postpone delivery of new messages" },
            { name: "0 s (default min) – 15 min" }
          ]}
        ]
      },
      {
        name: "SNS",
        children: [
          { name: "Pub/Sub model" },
          { name: "Topics", children: [
            { name: "Publisher → topic; all subs get events" },
            { name: "Up to 12.5M subscriptions per topic" },
            { name: "100K topics limit" }
          ]},
          { name: "FIFO SNS", children: [
            { name: "Similar to SQS FIFO" },
            { name: "SQS Standard + FIFO as subs" },
            { name: "Same throughput as SQS FIFO" }
          ]},
          { name: "Encryption", children: [
            { name: "In-flight HTTPS" },
            { name: "At-rest KMS" },
            { name: "Client-side" }
          ]},
          { name: "Access Policy — like S3 bucket policy" },
          { name: "Message Filtering", children: [
            { name: "JSON policy filters per subscription" },
            { name: "No filter → every message received" }
          ]},
          { name: "Fan-out (SNS + SQS)", children: [
            { name: "Push once to SNS → many SQS subs" },
            { name: "Cross-region delivery — works with SQS in other regions" }
          ]}
        ]
      },
      {
        name: "Kinesis",
        children: [
          { name: "Producer/Consumer model" },
          { name: "Data Streams", children: [
            { name: "Streaming ingest at scale" },
            { name: "Record = partition key + data blob" },
            { name: "Same partition key → same shard" },
            { name: "Immutable (can't delete)" },
            { name: "Replayable" },
            { name: "Retention 1–365 days (default 1)" },
            { name: "Cannot autoscale — pre-provision" }
          ]},
          { name: "Data Firehose", children: [
            { name: "Load to S3 / Redshift / OpenSearch / 3rd party / HTTP" },
            { name: "Fully managed, serverless, auto-scale" },
            { name: "Pay for data through Firehose" },
            { name: "Near real-time" },
            { name: "Custom transforms via Lambda" },
            { name: "Does NOT guarantee order" }
          ]},
          { name: "Data Analytics", children: [
            { name: "Real-time SQL on Streams + Firehose" },
            { name: "Enrich with S3 reference data" },
            { name: "Fully managed, auto-scale" }
          ]},
          { name: "Video Streams" }
        ]
      },
      {
        name: "EventBridge",
        children: [
          { name: "Trigger AWS services on events (AWS + 3rd party)" },
          { name: "Archive + replay events for debugging" },
          { name: "Trigger Types", children: [
            { name: "Schedule" },
            { name: "Event Patterns" }
          ]},
          { name: "Event Buses", children: [
            { name: "Default (AWS services)" },
            { name: "Partner (3rd party)" },
            { name: "Custom" }
          ]},
          { name: "Schema Registry", children: [
            { name: "Generate code knowing event shape" },
            { name: "Schemas versioned" }
          ]},
          { name: "Resource-based Policy", children: [
            { name: "Manage per-bus perms" },
            { name: "Allow/deny events from other account/region" },
            { name: "Aggregate org events in single account/region" }
          ]}
        ]
      },
      {
        name: "Amazon MQ",
        children: [
          { name: "On-prem broker protocols: MQTT, AMQP, STOMP, Openwire, WSS" }
        ]
      },
      {
        name: "SWF (Simple Workflow Service)",
        children: [{ name: "Coordinate work across distributed components" }]
      },
      {
        name: "AppFlow",
        children: [
          { name: "Transfer + integrate between AWS and SaaS" },
          { name: "Keep SaaS in sync with AWS" }
        ]
      },
      {
        name: "AppSync",
        children: [
          { name: "Managed real-time GraphQL APIs" },
          { name: "Query / mutate / subscribe" },
          { name: "Multiple sources: DynamoDB, RDS, Lambda → unified API" }
        ]
      }
    ]
  }
};

// ============================================================
// 14. MACHINE LEARNING
// ============================================================
window.AWS_DATA.sections.ml = {
  title: "Machine Learning",
  icon: "🤖",
  color: "#b03a99",
  summary: "Rekognition, Transcribe, Polly, Translate, Lex, Connect, Comprehend, SageMaker, Forecast, Kendra, Personalize, Textract.",
  root: {
    name: "Machine Learning",
    children: [
      {
        name: "Rekognition",
        children: [
          { name: "Computer Vision" },
          { name: "Labeling" },
          { name: "Content moderation" },
          { name: "Face detection + analysis (gender, age, emotion)" },
          { name: "Face search + verification" },
          { name: "Celebrity recognition" },
          { name: "Pathing (e.g. sports analysis)" }
        ]
      },
      {
        name: "Transcribe (speech → text)",
        children: [
          { name: "Auto-remove PII via redaction" },
          { name: "Auto language ID for multi-lingual audio" }
        ]
      },
      {
        name: "Polly (text → speech)",
        children: [
          { name: "Lexicon upload for acronyms / stylized words" },
          { name: "SSML speech customization" }
        ]
      },
      { name: "Translate", children: [{ name: "Language translation" }] },
      {
        name: "Lex",
        children: [
          { name: "Chatbots" },
          { name: "Call center bots" },
          { name: "NLU to recognize intent of text / caller" }
        ]
      },
      { name: "Connect", children: [{ name: "Cloud contact center" }] },
      {
        name: "Comprehend",
        children: [
          { name: "Managed NLP service" },
          { name: "Medical — detect Protected Health Information (PHI)" }
        ]
      },
      {
        name: "SageMaker",
        children: [
          { name: "Label / build / deploy ML models for devs + data scientists" }
        ]
      },
      { name: "Forecast", children: [{ name: "Timeseries analysis" }] },
      {
        name: "Kendra",
        children: [
          { name: "Managed ML-powered document search" },
          { name: "Sources: text, PDF, HTML, PowerPoint, Word, databases" }
        ]
      },
      { name: "Personalize", children: [{ name: "Recommendation system" }] },
      { name: "Textract", children: [{ name: "OCR + IE" }] }
    ]
  }
};

// ============================================================
// 15. SECURITY
// ============================================================
window.AWS_DATA.sections.security = {
  title: "Security",
  icon: "🛡️",
  color: "#28a745",
  summary: "Encryption, KMS, CloudHSM, Secrets Manager, ACM, WAF, Shield, GuardDuty, Inspector, Macie, Security Hub, STS.",
  root: {
    name: "Security",
    children: [
      {
        name: "Encryption",
        children: [
          { name: "In-flight" , children: [
            { name: "Encrypted before send / decrypted after receive" },
            { name: "TLS certificate used in HTTPS" }
          ]},
          { name: "Server-side" , children: [
            { name: "Server encrypts after receive / decrypts before send" }
          ]},
          { name: "Client-side" , children: [
            { name: "Client encrypts; server never decrypts" }
          ]}
        ]
      },
      {
        name: "KMS",
        children: [
          { name: "Integrated with IAM" },
          { name: "Audit via CloudTrail" },
          { name: "API via SDK / CLI" },
          { name: "$0.03 / 10,000 calls" },
          { name: "Deleted key → 'pending deletion' 7–30 days (default 30); recoverable" },
          { name: "Asymmetric vs Symmetric Keys", children: [
            { name: "Symmetric — AES-256" },
            { name: "Asymmetric — RSA & ECC key pair" }
          ]},
          { name: "Key Types", children: [
            { name: "AWS Owned (free) — SSE-S3, SSE-SQS, SSE-DDB default" },
            { name: "AWS Managed (free) — aws/service-name" },
            { name: "Customer managed created — $1/month" },
            { name: "Customer managed imported — $1/month" }
          ]},
          { name: "Key Rotation", children: [
            { name: "AWS-managed — auto every 1 year" },
            { name: "Customer-managed — auto (if enabled) or on-demand" },
            { name: "Imported — manual only via alias" }
          ]},
          { name: "Key Policies", children: [{ name: "Similar to S3 bucket policies" }] },
          { name: "Multi-region Keys", children: [
            { name: "MRK bound to single region; replicas to multiple" },
            { name: "Decrypt data in different region" },
            { name: "Use cases: global client-side encryption (DDB, Aurora)" }
          ]},
          { name: "Replicating encrypted S3 objects (SSE-KMS)", children: [
            { name: "Specify target KMS Key in destination" },
            { name: "Adapt target key policy" },
            { name: "IAM role: kms:Decrypt source + kms:Encrypt target" },
            { name: "May hit KMS throttling — Service Quota increase" }
          ]}
        ]
      },
      {
        name: "CloudHSM",
        children: [
          { name: "Dedicated HSM hardware for key gen/use" },
          { name: "AWS manages hardware/updates/availability" },
          { name: "Customer fully controls key mgmt + config" }
        ]
      },
      {
        name: "SSM Parameter Store",
        children: [
          { name: "Secure config + secrets store" },
          { name: "Optional KMS encryption" },
          { name: "Hierarchies" },
          { name: "Tiers", children: [
            { name: "Standard" }, { name: "Advanced" }
          ]},
          { name: "Parameter Policies", children: [
            { name: "TTL/expiration to force rotate/delete secrets" }
          ]}
        ]
      },
      {
        name: "Secrets Manager",
        children: [
          { name: "Secure secret storage" },
          { name: "Forced rotation every X days (Lambda)" },
          { name: "Auto-generate secrets on rotation" },
          { name: "Integrations: RDS, Aurora, Redshift, DocumentDB" },
          { name: "KMS encryption" },
          { name: "Multi-region Secrets", children: [
            { name: "Replicate across regions" },
            { name: "Read replicas in sync" },
            { name: "Promote replica to standalone" }
          ]}
        ]
      },
      {
        name: "AWS Certificate Manager (ACM)",
        children: [
          { name: "Provision, manage, deploy TLS" },
          { name: "Public + private certs" },
          { name: "Free public TLS" },
          { name: "Can generate certs" },
          { name: "Auto-renew" },
          { name: "Integrations", children: [
            { name: "ELB" }, { name: "CloudFront" }, { name: "API Gateway" },
            { name: "Cannot use from EC2" }
          ]}
        ]
      },
      {
        name: "Web Application Firewall (WAF)",
        children: [
          { name: "Layer 7 web exploit protection" },
          { name: "Integrations", children: [
            { name: "ALB" }, { name: "API Gateway" }, { name: "CloudFront" },
            { name: "AppSync GraphQL API" }, { name: "Cognito User Pool" }
          ]},
          { name: "Web ACL", children: [
            { name: "IP Set — up to 10,000 IPs" },
            { name: "HTTP headers/body/URI — protects from SQLi + XSS" },
            { name: "Size constraints" },
            { name: "Geo-match (country block)" },
            { name: "Rate-based rules (DDoS)" },
            { name: "Regional except CloudFront" },
            { name: "Rule group = reusable set of rules" }
          ]}
        ]
      },
      {
        name: "AWS Shield",
        children: [
          { name: "DDoS protection" },
          { name: "Modes", children: [
            { name: "Standard" }, { name: "Advanced" }
          ]}
        ]
      },
      {
        name: "AWS Firewall Manager",
        children: [
          { name: "Manage firewall rules across all AWS Org accounts" },
          { name: "Rules applied to new + existing resources" },
          { name: "Security Policies", children: [
            { name: "Common security rules" },
            { name: "WAF (ALB, API GW, CloudFront)" },
            { name: "Shield Advanced (ALB, CLB, NLB, EIP, CloudFront)" },
            { name: "Security Groups (EC2, ALB, ENI)" },
            { name: "Network Firewall (VPC)" },
            { name: "Route 53 Resolver DNS Firewall" },
            { name: "Regional policies" }
          ]}
        ]
      },
      {
        name: "GuardDuty",
        children: [
          { name: "Managed threat detection" },
          { name: "Analyze CloudTrail, VPC flow logs, etc." },
          { name: "Findings via EventBridge" },
          { name: "Foundational Sources", children: [
            { name: "CloudTrail Events Logs" },
            { name: "VPC Flow Logs" },
            { name: "DNS Logs" }
          ]},
          { name: "Other Sources", children: [
            { name: "S3 data event logs" },
            { name: "EKS audit logs" },
            { name: "Lambda network activity logs" },
            { name: "RDS login activity logs" },
            { name: "EBS volume data" }
          ]}
        ]
      },
      {
        name: "Inspector",
        children: [
          { name: "Automated security assessments" },
          { name: "Targets", children: [
            { name: "EC2" },
            { name: "Container images in ECR" },
            { name: "Lambda functions" }
          ]},
          { name: "Integrates with Security Hub + EventBridge" },
          { name: "EC2", children: [
            { name: "Uses SSM agent" },
            { name: "Unintended network accessibility" },
            { name: "OS known vulnerabilities" }
          ]},
          { name: "ECR", children: [{ name: "Assess images as pushed" }] },
          { name: "Lambda", children: [
            { name: "Code + dependency vulnerabilities" },
            { name: "Assessment as functions deploy" }
          ]}
        ]
      },
      {
        name: "Macie",
        children: [{ name: "Find PII in S3" }]
      },
      {
        name: "AWS Artifact",
        children: [{ name: "View/manage security + compliance reports" }]
      },
      {
        name: "Security Hub",
        children: [
          { name: "Unified view of security posture across accounts" },
          { name: "Aggregates findings from GuardDuty, Macie, Inspector, Config + 3rd party" }
        ]
      },
      {
        name: "STS (Security Token Service)",
        children: [
          { name: "Create/provide temporary credentials to trusted users" },
          { name: "Temporary creds work like long-term access keys" }
        ]
      }
    ]
  }
};

// ============================================================
// 16. VPC
// ============================================================
window.AWS_DATA.sections.vpc = {
  title: "VPC",
  icon: "🕸️",
  color: "#0ea5e9",
  summary: "VPC, subnets, IGW, NAT, SG/NACL, Peering, Endpoints, VPN, Direct Connect, Transit Gateway, Flow Logs, Network Firewall.",
  root: {
    name: "VPC",
    children: [
      {
        name: "Default VPC",
        children: [{ name: "Internet via IGW; EC2 have public IPv4s" }]
      },
      {
        name: "Own VPC",
        children: [
          { name: "Max 5 per region (soft)" },
          { name: "Max 5 CIDRs per VPC" }
        ]
      },
      {
        name: "CIDR Size",
        children: [
          { name: "Min /28 — 16 IPs" },
          { name: "Max /16 — 65,536 IPs" }
        ]
      },
      {
        name: "Allowed Private CIDR Ranges",
        children: [
          { name: "10.0.0.0 – 10.255.255.255 (10.0.0.0/8)" },
          { name: "172.16.0.0 – 172.31.255.255 (172.16.0.0/12)" },
          { name: "192.168.0.0 – 192.168.255.255 (192.168.0.0/16)" }
        ]
      },
      {
        name: "Subnets",
        children: [
          { name: "AWS reserves 5 IPs per subnet (first 4 + last 1)" },
          { name: "x.x.x.0 — Network Address" },
          { name: "x.x.x.1 — VPC router" },
          { name: "x.x.x.2 — Amazon DNS" },
          { name: "x.x.x.3 — future use" },
          { name: "x.x.x.255 — Broadcast (not supported → reserved)" },
          { name: "Subnet → single AZ" },
          { name: "Each subnet auto-assoc to main route table of VPC" },
          { name: "IPv6-only subnet — Nitro instances only" }
        ]
      },
      {
        name: "Internet Gateway",
        children: [
          { name: "Allows VPC → Internet" },
          { name: "Horizontal scale, HA, redundant" },
          { name: "Create separately, attach to VPC" },
          { name: "Route tables must route traffic to IGW" },
          { name: "Subnet becomes 'public' when routed through IGW" }
        ]
      },
      {
        name: "Bastion Host",
        children: [
          { name: "Instance in public subnet accessing private instances" },
          { name: "SSH to private via BH" },
          { name: "BH SG: allow 22 from internet" },
          { name: "Private SG: allow SSH from BH SG" }
        ]
      },
      {
        name: "NAT Instance",
        children: [
          { name: "Public subnet instance → private subnets reach internet" },
          { name: "Must have Elastic IP" },
          { name: "Disable EC2 src/dst check" },
          { name: "Use NAT AMIs" },
          { name: "Private subnet route tables → NAT Instance" },
          { name: "SG Rules", children: [
            { name: "Inbound", children: [
              { name: "Allow HTTP/HTTPS from private subnets" },
              { name: "Allow SSH from source net (via IGW)" }
            ]},
            { name: "Outbound — HTTP/HTTPS to internet" }
          ]}
        ]
      },
      {
        name: "NAT Gateway",
        children: [
          { name: "AWS-managed NAT instance" },
          { name: "Higher bandwidth, HA, no admin" },
          { name: "Pay per hour + bandwidth" },
          { name: "AZ-bound" },
          { name: "Uses Elastic IP" },
          { name: "Not usable by EC2 in same subnet (only other subnets)" },
          { name: "Private Subnet → NATGW → IGW" },
          { name: "5 Gbps, auto-scale to 100 Gbps" }
        ]
      },
      {
        name: "SGs & NACLs",
        children: [
          { name: "SGs", children: [
            { name: "Instance level" },
            { name: "Stateful (return traffic auto-allowed)" },
            { name: "Allow rules only" },
            { name: "Evaluate all rules" },
            { name: "New SG: deny inbound / allow outbound" }
          ]},
          { name: "NACLs", children: [
            { name: "Subnet level" },
            { name: "Stateless" },
            { name: "Allow + Deny rules" },
            { name: "One NACL per subnet; new subnets get Default NACL" },
            { name: "Decoupled — NACLs live in VPC" },
            { name: "Default NACL: allow all" },
            { name: "New NACLs: deny all" },
            { name: "Must configure ephemeral ports (stateless)" }
          ]}
        ]
      },
      {
        name: "VPC Peering",
        children: [
          { name: "Private connect between two VPCs over AWS network" },
          { name: "No overlapping CIDRs" },
          { name: "NOT transitive" },
          { name: "Update route tables in both VPCs" },
          { name: "Cross-account + cross-region" },
          { name: "Reference SG in peered VPC (cross-account, same region)" }
        ]
      },
      {
        name: "VPC Endpoints",
        children: [
          { name: "AWS PrivateLink — private access to AWS services" },
          { name: "No IGW / NATGW needed" },
          { name: "Types", children: [
            { name: "Interface Endpoint" },
            { name: "Gateway Endpoint" }
          ]}
        ]
      },
      {
        name: "Flow Logs",
        children: [
          { name: "Capture IP traffic to network interfaces" },
          { name: "Query via Athena on S3 or CW Logs Insights" },
          { name: "Destinations", children: [
            { name: "S3" },
            { name: "CloudWatch Logs" },
            { name: "Kinesis Data Firehose" }
          ]}
        ]
      },
      {
        name: "Site-to-site VPN",
        children: [
          { name: "VPC ↔ on-prem private VPN over public network" },
          { name: "Can back up Direct Connect" },
          { name: "Needs", children: [
            { name: "Virtual Private Gateway (VGW)" },
            { name: "Customer Gateway (CGW)" }
          ]},
          { name: "VPN CloudHub", children: [
            { name: "Secure multi-site comms with multiple VPNs" },
            { name: "Setup: multiple VPNs on same VGW + dynamic routing + route tables" }
          ]}
        ]
      },
      {
        name: "Direct Connect (Dx)",
        children: [
          { name: "Dedicated private connection → VPC" },
          { name: "Dedicated connection between DC and Dx location" },
          { name: "VGW at VPC side" },
          { name: "Lead time often > 1 month" },
          { name: "Connection Flows", children: [
            { name: "Private VPC connection" },
            { name: "Public resources connection" }
          ]},
          { name: "Dx Gateway", children: [
            { name: "Connect one Dx to many VPCs across regions (same account)" },
            { name: "Dx → Dx Gateway → many VGWs" }
          ]},
          { name: "Connection Types", children: [
            { name: "Dedicated" },
            { name: "Hosted" }
          ]},
          { name: "Encryption", children: [
            { name: "Data in transit NOT encrypted (private only)" },
            { name: "Dx + VPN → IPsec-encrypted private connection" }
          ]},
          { name: "Resiliency", children: [
            { name: "High resiliency" },
            { name: "Max resiliency" }
          ]}
        ]
      },
      {
        name: "Transit Gateway",
        children: [
          { name: "Central hub connecting many VPCs transitively" },
          { name: "Connects to Dx Gateway + Site-to-site VPN" },
          { name: "Regional resource" },
          { name: "Cross-account share via RAM" },
          { name: "Peer TGWs across regions" },
          { name: "Route Tables limit VPC ↔ VPC traffic" },
          { name: "Supports IP Multicast" },
          { name: "Multi-TGW peering across regions" },
          { name: "Site-to-site VPN ECMP", children: [
            { name: "Forward packet over multiple best paths" },
            { name: "Use case: multiple S2S VPNs to increase bandwidth" }
          ]}
        ]
      },
      {
        name: "VPC Traffic Mirroring",
        children: [
          { name: "Mirror traffic to your security appliances" },
          { name: "Source + target same VPC or different (VPC Peering)" }
        ]
      },
      {
        name: "Egress-only Internet Gateway",
        children: [
          { name: "IPv6 only" },
          { name: "Like NAT Gateway for IPv6" },
          { name: "Must update route tables" },
          { name: "Outbound IPv6 only; blocks inbound initiation" }
        ]
      },
      {
        name: "AWS Network Firewall",
        children: [
          { name: "Protects entire VPC — L3 to L7" },
          { name: "Uses Gateway Load Balancer internally" },
          { name: "Central mgmt via Firewall Manager across accounts/VPCs" },
          { name: "Logs to S3, CloudWatch Logs, Firehose" },
          { name: "Protect Directions", children: [
            { name: "VPC ↔ VPC" },
            { name: "Outbound internet" },
            { name: "Inbound internet" },
            { name: "Dx & S2S VPN" }
          ]},
          { name: "Fine-grained Controls", children: [
            { name: "IP & port — 10,000s of IPs" },
            { name: "Protocol — e.g., block SMB outbound" },
            { name: "Stateful domain list — *.mycorp.com" },
            { name: "Regex pattern matching" }
          ]}
        ]
      }
    ]
  }
};

// ============================================================
// 17. COST
// ============================================================
window.AWS_DATA.sections.cost = {
  title: "Cost",
  icon: "💰",
  color: "#f59e0b",
  summary: "Cost Explorer, Cost Anomaly Detection.",
  root: {
    name: "Cost",
    children: [
      {
        name: "Cost Explorer",
        children: [
          { name: "Visualize, understand, manage AWS costs + usage" },
          { name: "Custom reports for cost + usage" },
          { name: "Granularity: monthly, hourly, resource level" },
          { name: "Forecast up to 12 months ahead" },
          { name: "API with pagination" }
        ]
      },
      {
        name: "Cost Anomaly Detection",
        children: [
          { name: "ML monitors cost + usage for unusual spend" },
          { name: "Monitor services, accounts, cost allocation tags, cost categories" },
          { name: "Anomaly report with root-cause analysis" },
          { name: "Alerts via SNS — individual or daily/weekly summary" }
        ]
      }
    ]
  }
};
