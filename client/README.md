## Client

### General Design

- Main UI components: 
	- **"NewMessage"** - Represnts of creating new message form.
	- **"MessageList"** - Represnts displaying the relevant messages list according to the filter value in descending order by date.
	- **"MessageItem"** - Represnts one message item from the list. While clicking on message item avatar ou can see the last activated time.
	- **"Dialog"** - generic template for popup modal (shared component).
	
- Utils:
	- **"MessagesAPI"** - Contians the defenition of all the API calls.