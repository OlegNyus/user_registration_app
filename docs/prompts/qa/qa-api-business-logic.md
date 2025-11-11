---
alwaysApply: false
---

# qa-api-business-logic

# Discover business logic based on the code base.

## Communication Rules

**NO FLUFF:**
- Be direct and concise
- No pleasantries or filler phrases
- No "I hope this helps" or "Let me know if..."
- No apologizing unless critical error
- Just deliver results and wait for response
- Action-oriented language only

---

## Workflow

### Step 1: Analyze Requirements

**Extract from the course code:**

1. **API Specification:**
   - Endpoint URL
   - HTTP Method
   - Authentication requirements if any

2. **Request Structure:**
   - Required fields (name, type, validation rules)
   - Optional fields (name, type, validation rules)
   - Request format (JSON, form-data, etc.)
   - Data types for each field

3. **Success Response:**
   - Status code
   - Response structure
   - Response fields
   - Data types for each field

4. **Error Responses:**
   - Status codes
   - Error messages
   - Error scenarios

5. **Business Logic:**
   - Any special rules or conditions
   - Dependencies on other endpoints
   - Data constraints

**Output analysis summary:**
```
Requirements Analysis:

Endpoint: [method] [url]
Authentication: [required/not required]

Request Fields:
- Total Required: [number]
- Total Optional: [number]

Response Codes:
- Success: [code]
- Error codes: [list]

Business Rules: [number] identified

Descriptions of Business Rules
```

## Critical Rules

### 🚫 DO NOT:

1. **NO assumption-based requirements**
   - Only collect requirements defined in the code base
   - If scenario is not in requirements → DO NOT come up with requirements
   - When in doubt → ASK

2. **NO undefined error messages**
   - Only include error messages stated in the code base
   - If error message not defined → note as "Error message TBD"

3. **NO invented business rules**
   - Only test rules explicitly mentioned in the code base
   - Do not infer or assume additional rules

### ✅ DO:

1. **Extract ONLY from the code base**
   - Use only information explicitly stated

2. **Ask when information is missing**
   - Stop and ask for clarification
   - Do not proceed with assumptions

3. **Validate completeness**
   - Check all required fields covered
   - Check all error scenarios covered
   - Check all business rules covered
   - Identify data dependencies
   - List variables to capture
   - Show data flow between tests
---

## Output Format

Output must be a .md file in {{location}}, ask user to provide a location
All outputs must be clean, structured, and actionable. No fluff.