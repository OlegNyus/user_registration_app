---
alwaysApply: false
---

# qa-api-business-logic

Discover business logic based ONLY on the source code with 100% coverage. No assumptions, no guessing.

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

### Step 1: Source Code Analysis

**Extract ONLY from provided source code:**

1. **API Specification:**
   - Exact endpoint URL (with path parameters)
   - HTTP Method (GET, POST, PUT, DELETE, PATCH)
   - Authentication requirements (headers, tokens, API keys)
   - Content-Type requirements

2. **Request Structure Analysis:**
   - Required fields (exact name, data type, validation rules, constraints)
   - Optional fields (exact name, data type, default values)
   - Request format (JSON, form-data, multipart, query params)
   - Field dependencies (conditional requirements)
   - Data type specifications (string, number, boolean, array, object)
   - Field length limits, ranges, patterns
   - Nested object structures

3. **Response Structure Analysis:**
   - Success status codes (200, 201, 204, etc.)
   - Success response body structure
   - Response field names and data types
   - Nested response objects and arrays
   - Response headers
   - Pagination structure (if applicable)

4. **Error Response Analysis:**
   - Error status codes (400, 401, 403, 404, 500, etc.)
   - Error response body structure
   - Error message formats
   - Error code mappings
   - Validation error structures
   - Multiple error response schemas

5. **Business Logic Rules:**
   - Field validation rules from code
   - Business constraints and conditions
   - Dependencies between fields
   - Conditional logic flows
   - Data transformation rules
   - State change requirements

**Output detailed analysis:**
```
Source Code Analysis:

Endpoint: [method] [exact url with parameters]
Authentication: [specific requirements from code]
Content-Type: [from code]

Request Structure:
Required Fields: [number]
[list each with: name | type | validation | constraints]

Optional Fields: [number]
[list each with: name | type | default | validation]

Response Structure:
Success Codes: [list]
Success Body: [exact structure from code]
Response Fields: [list each with name | type | description]

Error Structure:
Error Codes: [list]
Error Body Schemas: [exact structures from code]
Error Messages: [exact messages from code]

Business Rules: [number]
[list each rule with exact implementation from code]

Field Dependencies: [list]
Data Constraints: [list]
```

### Step 2: Coverage Validation

**Verify 100% requirement extraction:**

1. **API Coverage Check:**
   - All endpoints documented in code are analyzed
   - All HTTP methods covered
   - All authentication scenarios identified
   - All middleware requirements captured

2. **Request Coverage Check:**
   - All request fields from code are documented
   - All validation rules from code are captured
   - All data types are correctly identified
   - All constraints and limits are noted

3. **Response Coverage Check:**
   - All possible response codes from code
   - All response structures documented
   - All response fields with correct types
   - All error scenarios from code

4. **Business Logic Coverage:**
   - All validation functions analyzed
   - All business rules from code documented
   - All conditional logic captured
   - All data transformations noted

**Output coverage validation:**
```
Coverage Validation:

API Coverage: [✅/❌]
- Endpoints analyzed: [X/X]
- Methods covered: [X/X]
- Auth scenarios: [X/X]

Request Coverage: [✅/❌]
- Fields documented: [X/X]
- Validation rules: [X/X]
- Data types verified: [X/X]

Response Coverage: [✅/❌]
- Status codes: [X/X]
- Response structures: [X/X]
- Error scenarios: [X/X]

Business Logic Coverage: [✅/❌]
- Validation functions: [X/X]
- Business rules: [X/X]
- Conditional logic: [X/X]

Total Coverage: [percentage]%
```

### Step 3: Detail Verification

**Double-check ALL extracted details:**

1. **Data Type Verification:**
   - Cross-reference field types with actual code
   - Verify nullable/required specifications
   - Confirm array vs object structures
   - Validate nested object schemas

2. **Validation Rule Verification:**
   - Compare extracted rules with source code
   - Verify min/max values, lengths, patterns
   - Confirm custom validation logic
   - Check conditional validations

3. **Business Rule Verification:**
   - Trace business logic through source code
   - Verify rule implementation details
   - Confirm rule triggers and conditions
   - Validate rule priority and execution order

4. **Error Handling Verification:**
   - Map error codes to source code
   - Verify error message text accuracy
   - Confirm error response structures
   - Validate error condition triggers

**Output verification results:**
```
Detail Verification:

Data Types: [✅/❌]
- All types verified against source code
- Nullable specifications confirmed
- Nested structures validated

Validation Rules: [✅/❌]
- All rules traced to source code
- Custom logic verified
- Conditional validations confirmed

Business Rules: [✅/❌]
- Implementation details verified
- Rule triggers confirmed
- Execution order validated

Error Handling: [✅/❌]
- Error codes mapped to source
- Message text verified
- Response structures confirmed

Verification Status: [COMPLETE/INCOMPLETE]
```

### Step 4: Final Requirements Document

**Generate comprehensive requirements document:**

1. **Complete API Specification**
2. **Detailed Request/Response Schemas**  
3. **Comprehensive Business Rules**
4. **Complete Error Handling Matrix**
5. **Data Flow Documentation**
6. **Test Case Requirements**

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

4. **NO incomplete analysis**
   - Must achieve 100% coverage before proceeding
   - Cannot skip any fields, validations, or responses
   - All data types must be verified against source code

5. **NO guessing data structures**
   - Extract exact field names from source code
   - Verify exact data types from source code
   - Confirm exact validation rules from source code
   - Map exact error messages from source code

### ✅ DO:

1. **Extract ONLY from the code base**
   - Use only information explicitly stated
   - Quote exact field names, types, messages
   - Reference specific code lines/functions

2. **Ask when information is missing**
   - Stop and ask for clarification
   - Do not proceed with assumptions
   - Request additional source code if needed

3. **Validate completeness**
   - Check all required fields covered
   - Check all error scenarios covered
   - Check all business rules covered
   - Identify data dependencies
   - List variables to capture
   - Show data flow between tests

4. **Ensure 100% coverage**
   - Verify every endpoint analyzed
   - Document every field and validation
   - Capture every error scenario
   - Map every business rule

5. **Double-check everything**
   - Cross-reference extracted data with source code
   - Verify data types match code definitions
   - Confirm validation rules match implementations
   - Validate error messages match code

## Validation Checklist

Before marking analysis complete, verify:

- [ ] All endpoints from source code analyzed
- [ ] All request fields documented with exact types
- [ ] All validation rules traced to source code
- [ ] All response structures documented
- [ ] All error codes and messages from source code
- [ ] All business rules from source code captured
- [ ] Data types verified against source code
- [ ] Field dependencies documented
- [ ] Conditional logic mapped
- [ ] 100% coverage achieved
- [ ] No assumptions made
- [ ] No invented requirements
- [ ] All details double-checked

---

## Output Format

Output must be a .md file in {{location}}, ask user to provide a location.
All outputs must be clean, structured, and actionable. No fluff.

**Required sections in output document:**
1. API Specification (exact from source code)
2. Request Schema (with data types and validations)
3. Response Schema (with all possible responses)
4. Error Handling Matrix (all error scenarios)
5. Business Rules (exact implementation details)
6. Test Case Requirements (derived from rules)
7. Coverage Report (100% verification)