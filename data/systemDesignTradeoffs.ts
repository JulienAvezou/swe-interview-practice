import type { SystemDesignTradeoff } from "./types";

export const systemDesignTradeoffs: SystemDesignTradeoff[] = [
  {
    id: "fanout-write",
    question: "You are designing a social feed. When is fan-out-on-write a good choice?",
    options: ["Users have many reads and most users do not have massive follower counts.", "Every user has millions of followers.", "Writes are rare but reads never happen.", "The feed must be strongly consistent across all users."],
    correctAnswer: "Users have many reads and most users do not have massive follower counts.",
    explanation: "Fan-out-on-write precomputes feeds to optimize read latency. It gets expensive for celebrity accounts, so hybrid models are common.",
  },
  {
    id: "sql-nosql",
    question: "A ticket booking system must avoid selling the same seat twice. Which storage choice is usually safer for the core reservation path?",
    options: ["SQL transaction with row locking", "Eventually consistent NoSQL write", "Static CDN file", "Client-side localStorage"],
    correctAnswer: "SQL transaction with row locking",
    explanation: "Seat reservation needs strong consistency and transactional guarantees. SQL is usually the clearer fit for that critical path.",
  },
  {
    id: "cache-invalidation",
    question: "What is the main risk when caching user profile data?",
    options: ["Stale reads after updates", "Lower read throughput", "Fewer cache hits", "Mandatory global locking"],
    correctAnswer: "Stale reads after updates",
    explanation: "Caching improves read speed but introduces invalidation questions: when to expire, update, or evict cached data.",
  },
  {
    id: "queue-vs-sync",
    question: "When should sending an email notification be placed on a queue?",
    options: ["When it is retryable and should not block the user request", "When it must complete before returning success", "When the database has no indexes", "When the payload is static HTML"],
    correctAnswer: "When it is retryable and should not block the user request",
    explanation: "Queues decouple slow side effects from the request path and allow retries without making the user wait.",
  },
  {
    id: "websocket-polling",
    question: "A chat app needs frequent low-latency message delivery. What is the better default?",
    options: ["WebSockets", "Daily batch job", "Full page refresh", "Manual polling every hour"],
    correctAnswer: "WebSockets",
    explanation: "WebSockets keep a persistent connection open for server-pushed updates, which fits active chat better than polling.",
  },
  {
    id: "strong-eventual",
    question: "Which data probably needs strong consistency?",
    options: ["Bank account balance", "Like count", "Trending topic score", "Profile view count"],
    correctAnswer: "Bank account balance",
    explanation: "Incorrect financial reads or writes are high impact. Counts and rankings usually tolerate short-lived staleness.",
  },
  {
    id: "read-write-heavy",
    question: "A product page receives far more reads than writes. Which technique is likely useful?",
    options: ["CDN and cache hot product data", "Require all reads to hit the primary database", "Disable indexes", "Fan out every read to all users"],
    correctAnswer: "CDN and cache hot product data",
    explanation: "Read-heavy systems benefit from caching, CDNs, and replicas so the primary database is not the bottleneck.",
  },
];
