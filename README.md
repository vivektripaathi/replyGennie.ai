## Reply Gennie

Reply-Gennie is an intelligent email management tool designed to enhance your email communication experience. This application actively monitors your inbox for new and unread emails, utilizing OpenAI's advanced language processing capabilities to read incoming messages. Upon detection of an email, Reply-Gennie assigns an appropriate label based on the content and context of the message, ensuring efficient organization. Additionally, it generates and sends thoughtful replies automatically, streamlining your email responses and improving productivity.

Whether you're managing personal or professional correspondence, Reply-Gennie provides a seamless solution for effective email handling, allowing you to focus on what matters most.

## Features

- **Automated Email Monitoring**: Continuously checks for unread emails and processes them in real-time.
- **Sequential Reply Handling**: Ensures each email is addressed one by one, maintaining context and relevance.
- **Integration with OpenAI**: Utilizes AI to generate contextual replies, improving response quality and engagement.
- **Label Assignment**: Automatically assigns specified labels to processed emails, helping to organize your inbox effectively.
- **BullMQ & Redis for Task Management**: Employs BullMQ and Redis for effective job scheduling and management, ensuring reliable email processing without redundancy.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- Redis server
- A Google Cloud account with access to the Gmail API
- OpenAI API key (if using OpenAI integration)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/reply-gennie.git
   ```

2. **Navigate to the Project Directory:**

    ```bash
    cd reply-gennie
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```


## Configuration

1. **Environment Variables**: Rename the provided .env.example file to .env in the project root:

```bash
    mv .env.example .env
```

2. **Edit the `.env` File**: Open the `.env` file and fill the variables with your values:


## Running the Project

1. **Start the Redis Server**(if not running):

    ```bash
    redis-server
    ```

2. **Compile and run the project**:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
