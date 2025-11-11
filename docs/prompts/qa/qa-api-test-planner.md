---
alwaysApply: false
---

# qa-api-test-planner

Analyze API requirements and create comprehensive test plans with 100% coverage. Supports both Individual Endpoint Testing and CRUD Flow Testing.

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

### Step 1: Test Suite Type Selection

**Ask user to choose test suite type:**

```
Test Suite Options:

1. Individual Endpoint Testing - Isolated validation of each endpoint
2. CRUD Flow Testing - Resource lifecycle and workflow validation  
3. Both - Complete test coverage with individual and flow tests

Which test suite type do you want to plan?
```

**Wait for user selection**

---

### Step 2: Requirements Analysis

**Extract ONLY from provided requirements:**

1. **API Specification:**
   - Exact endpoint URLs (with path parameters)
   - HTTP Methods (GET, POST, PUT, DELETE, PATCH)
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
   - Error status codes (400, 401, 403, 404, 500, etc.)
   - Error response body structures
   - Error message formats and mappings

4. **Business Logic Rules:**
   - Field validation rules from requirements
   - Business constraints and conditions
   - Dependencies between fields
   - State change requirements
   - Resource lifecycle rules

**Output detailed analysis:**
```
Requirements Analysis:

Endpoint: [method] [exact url with parameters]
Authentication: [specific requirements]
Content-Type: [from requirements]

Request Structure:
Required Fields: [number]
[list each with: name | type | validation | constraints]

Optional Fields: [number]
[list each with: name | type | default | validation]

Response Structure:
Success Codes: [list]
Success Body: [exact structure]
Error Codes: [list]
Error Body Schemas: [exact structures]
Error Messages: [exact messages]

Business Rules: [number]
[list each rule with exact implementation details]

Field Dependencies: [list]
Data Constraints: [list]
```

**If information is missing:**
```
⚠️ MISSING INFORMATION:

Cannot find the following in requirements:
- [Missing item 1]
- [Missing item 2]

Provide missing information or confirm to proceed with available data only.
```

**Wait for user response**

---

### Step 3A: Individual Endpoint Testing Workflow

**If user selected Individual Endpoint Testing:**

#### Step 3A.1: Propose Test Types

**Based on requirements, propose relevant test types:**

```
Proposed Test Types:

1. Positive Tests - Valid inputs, expected success scenarios
2. Negative Tests - Invalid inputs, error handling
3. Required Fields Validation - Missing mandatory fields
4. Data Type Validation - Wrong data types for fields
5. Boundary Tests - Min/max values, edge cases
6. Format Validation - Email, date, phone format validation
7. Authentication/Authorization - Valid/invalid tokens, permissions
8. Business Logic Validation - Rules specific to this endpoint

Do you want to add or remove any test types?
```

**Wait for approval**

#### Step 3A.2: Create Individual Endpoint Test Cases

**Format: Table with Faker data generation**

| Test Type | Test Case Title | Preconditions | Test Data (Faker Generated) | Expected Result |
|-----------|----------------|---------------|------------------------------|-----------------|
| [Type] | [Action/Scenario] - [HTTP METHOD] [endpoint] | [What needs to exist] | [Faker generation patterns] | [Status code + response details] |

**Test Data Generation Requirements:**
- All test data MUST use Faker generation
- Include data generation patterns for each field
- Ensure uniqueness per test run
- No hardcoded test values allowed

**Example:**
```javascript
// Test Data Generation Pattern
const testData = {
  email: faker.internet.email(),
  amount: faker.number.float({ min: -100, max: -1, precision: 0.01 }),
  currency: "USD",
  recipientId: faker.string.uuid(),
  timestamp: Date.now()
}
```

#### Step 3A.3: Individual Endpoint Coverage Validation

**Verify 100% requirement coverage:**

```
Coverage Validation:

Required Fields Coverage: [✅/❌]
- Total Required Fields: [number]
- Fields with 4 test cases each: [number] (missing, wrong type, null, valid)
- ✅ All required fields have complete validation

Optional Fields Coverage: [✅/❌]
- Total Optional Fields: [number]
- Optional fields with boundary tests: [number]

Error Scenarios Coverage: [✅/❌]
- Total Error Scenarios: [number]
- Error scenarios covered: [number]

Business Rules Coverage: [✅/❌]
- Total Business Rules: [number]
- Business rules tested: [number]

Total Coverage: [percentage]%
```

---

### Step 3B: CRUD Flow Testing Workflow

**If user selected CRUD Flow Testing:**

#### Step 3B.1: Resource Lifecycle Analysis

**Identify CRUD operations and flow patterns:**

```
CRUD Flow Analysis:

Resource: [Resource Name]
Available Operations:
- CREATE: POST [endpoint] 
- READ: GET [endpoint]
- UPDATE: PUT/PATCH [endpoint]
- DELETE: DELETE [endpoint]

Lifecycle States:
- Initial State: [state]
- Active State: [state]
- Modified State: [state]
- Deleted State: [state]

State Transitions:
[Initial] → [Active] → [Modified] → [Deleted]
```

#### Step 3B.2: CRUD Flow Test Cases

**Format: Sequential workflow test cases**

| Flow Type | Test Sequence | Test Steps | Data Validation | Expected States |
|-----------|---------------|------------|-----------------|-----------------|
| Complete CRUD Lifecycle | CREATE → READ → UPDATE → READ → DELETE → READ | 1. Create resource with data X<br>2. Verify resource exists with data X<br>3. Update to data Y<br>4. Verify resource has data Y<br>5. Delete resource<br>6. Verify resource returns 404 | Data X persistence<br>Data Y update<br>Resource deletion | Created → Active → Modified → Deleted |

**CRUD Flow Test Examples:**

```
1. User Lifecycle Flow:
   - POST /users (create) → GET /users/{id} (verify creation)
   - PUT /users/{id} (update) → GET /users/{id} (verify update)  
   - DELETE /users/{id} (delete) → GET /users/{id} (verify 404)

2. Data Persistence Flow:
   - Create with firstName: "John" → Verify firstName: "John"
   - Update to firstName: "Jane" → Verify firstName: "Jane"
   - Verify other fields unchanged during update

3. State Transition Flow:
   - Create user (status: "active") → Update (status: "inactive") → Delete
   - Verify status changes correctly at each step
```

#### Step 3B.3: CRUD Flow Coverage Validation

**Verify complete workflow coverage:**

```
CRUD Flow Coverage:

Operation Coverage: [✅/❌]
- CREATE operation: [✅/❌]
- READ operation: [✅/❌]
- UPDATE operation: [✅/❌]
- DELETE operation: [✅/❌]

Lifecycle Coverage: [✅/❌]
- Complete CRUD sequence: [✅/❌]
- Data persistence validation: [✅/❌]
- State transition validation: [✅/❌]
- Cross-operation consistency: [✅/❌]

Workflow Coverage: [✅/❌]
- Resource creation → verification: [✅/❌]
- Resource update → verification: [✅/❌]
- Resource deletion → verification: [✅/❌]

Total CRUD Coverage: [percentage]%
```

---

### Step 4: Test Data Generation Rules

**ALWAYS use Faker for ALL test data:**

1. **Required Dependencies:**
   ```json
   {
     "devDependencies": {
       "@faker-js/faker": "^8.3.1"
     }
   }
   ```

2. **Data Generation Patterns:**
   ```javascript
   import { faker } from '@faker-js/faker'
   
   // Individual Endpoint Testing
   const testData = {
     email: faker.internet.email(),
     password: faker.internet.password(),
     firstName: faker.person.firstName(),
     amount: faker.number.float({ min: 0.01, max: 999.99, precision: 0.01 }),
     uniqueId: faker.string.uuid(),
     timestamp: Date.now()
   }
   
   // CRUD Flow Testing
   const crudTestData = {
     createData: {
       name: faker.person.fullName(),
       email: faker.internet.email(),
       role: faker.helpers.arrayElement(['admin', 'user', 'viewer'])
     },
     updateData: {
       name: faker.person.fullName(), // Different from create
       role: faker.helpers.arrayElement(['admin', 'user', 'viewer'])
     }
   }
   ```

3. **Data Uniqueness Requirements:**
   - All test data MUST be unique per test run
   - Include timestamp or UUID for guaranteed uniqueness
   - No hardcoded test data allowed
   - Use faker.seed() only for reproducible test scenarios

---

### Step 5: Version Management Rules

**ALWAYS use latest stable versions:**

1. **Framework Dependencies:**
   ```json
   {
     "devDependencies": {
       "cypress": "^13.6.0",
       "@playwright/test": "^1.40.0",
       "@faker-js/faker": "^8.3.1",
       "typescript": "^5.3.0"
     }
   }
   ```

2. **Update verification before generation:**
   - Check latest versions available
   - Include security patches and performance improvements
   - Update package.json with current stable releases

---

### Step 6: Test Cases Summary

**Provide comprehensive summary:**

```
Test Cases Summary:
-------------------
Test Suite Type: [Individual Endpoint/CRUD Flow/Both]
Total Test Cases: [number]

[FOR INDIVIDUAL ENDPOINT TESTING:]
- Positive Tests: [number]
- Negative Tests: [number]
- Required Fields Validation: [number]
- Data Type Validation: [number]
- Boundary Tests: [number]
- Format Validation: [number]
- Authentication Tests: [number]
- Business Logic Tests: [number]

[FOR CRUD FLOW TESTING:]
- Complete Lifecycle Flows: [number]
- Data Persistence Flows: [number]
- State Transition Flows: [number]
- Cross-Operation Validations: [number]

Precondition Test Cases: [number]
Test Data Generation: Faker-based (100% unique)
Framework Versions: Latest stable versions
Coverage: [percentage]%
```

---

### Step 7: Comprehensive Coverage Validation

**Verify 100% requirement coverage:**

```
Coverage Verification:

API Coverage: [✅/❌]
- Endpoints analyzed: [X/X]
- Methods covered: [X/X]
- Auth scenarios: [X/X]

Request Coverage: [✅/❌]
- Required fields: [X/X] (each with 4 test cases)
- Optional fields: [X/X]
- Validation rules: [X/X]

Response Coverage: [✅/❌]
- Success responses: [X/X]
- Error responses: [X/X]
- Status codes: [X/X]

Business Logic Coverage: [✅/❌]
- Business rules: [X/X]
- Conditional logic: [X/X]
- State transitions: [X/X]

Data Generation Coverage: [✅/❌]
- All data uses Faker: [✅/❌]
- No hardcoded values: [✅/❌]
- Uniqueness guaranteed: [✅/❌]

Total Coverage: [percentage]%
```

**If coverage is incomplete:**
```
⚠️ INCOMPLETE COVERAGE:

Missing test cases for:
- Required field: [field name] (missing: wrong type test, null test)
- Error scenario: [scenario description]
- Business rule: [rule description]
- CRUD operation: [operation description]

Add missing test cases or confirm to proceed as-is?
```

**Wait for user response**

---

### Step 8: Wait for Approval

"Review test cases and coverage validation. Approved?"

**Wait for approval**

---

### Step 9: Ask for File Path

"Where should I save test-cases.md?"

**Wait for user response**

---

### Step 10: Generate test-cases.md

**Create comprehensive markdown file:**

```markdown
# Test Cases - [Endpoint/Resource Name]

**Generated:** [timestamp]
**Test Suite Type:** [Individual Endpoint/CRUD Flow/Both]
**Total Test Cases:** [number]
**Coverage:** [percentage]%

---

## Requirements Summary

**Endpoint(s):** [HTTP METHOD] [URL]
**Authentication:** [Yes/No - specific details]

**Required Fields:**
- field1 (type) - [validation rules]
- field2 (type) - [validation rules]

**Optional Fields:**
- field3 (type) - [validation rules]

**Success Response:**
- responseField1 (type)
- responseField2 (type)

**Error Responses:**
- 400: [scenarios]
- 401: [scenarios]
- 404: [scenarios]

---

## Test Data Generation

**Faker Patterns:**
```javascript
import { faker } from '@faker-js/faker'

const testData = {
  // Required fields
  email: faker.internet.email(),
  amount: faker.number.float({ min: 0.01, max: 999.99, precision: 0.01 }),
  
  // Test variations
  invalidAmount: faker.number.float({ min: -100, max: -1, precision: 0.01 }),
  invalidEmail: faker.lorem.word(),
  
  // Unique identifiers
  uniqueId: faker.string.uuid(),
  timestamp: Date.now()
}
```

**Data Uniqueness:**
- All test data generated using Faker
- Unique values per test run
- No hardcoded test values
- Timestamp/UUID for guaranteed uniqueness

---

[FOR INDIVIDUAL ENDPOINT TESTING:]
## Individual Endpoint Test Cases

[Complete test cases table from workflow]

## Precondition Test Cases

1. [Precondition test description]
   - Captures: [variables using Faker]

2. [Precondition test description]
   - Captures: [variables using Faker]

[FOR CRUD FLOW TESTING:]
## CRUD Flow Test Cases

### Complete Resource Lifecycle Tests

1. **User Lifecycle Flow**
   - CREATE: POST /users → capture userId
   - READ: GET /users/{userId} → verify creation
   - UPDATE: PUT /users/{userId} → update data
   - READ: GET /users/{userId} → verify update
   - DELETE: DELETE /users/{userId} → remove resource
   - READ: GET /users/{userId} → verify 404

2. **Data Persistence Flow**
   - Create with data set A → Verify data set A
   - Update to data set B → Verify data set B
   - Verify unchanged fields remain intact

3. **State Transition Flow**
   - Create (active state) → Update (inactive state) → Delete
   - Verify state changes at each step
   - Validate business rules for state transitions

---

## Test Cases Summary

**Test Suite Type:** [Individual Endpoint/CRUD Flow/Both]
- Total Test Cases: [number]
[Individual Endpoint breakdown if applicable]
[CRUD Flow breakdown if applicable]

**Test Data:** Faker-generated (100% unique)
**Framework Versions:** Latest stable
**Coverage:** [percentage]%

---

## Test Data Dependencies

```
Flow:
1. Precondition: Create User → userId (Faker generated)
2. Precondition: Create Account → accountId (uses userId)
3. Test Case 1: Create Payment → paymentId (uses userId, accountId)
4. Test Case 2: Verify Payment → uses paymentId

[FOR CRUD FLOW:]
CRUD Dependencies:
1. CREATE: Generate resource → resourceId
2. READ: Use resourceId for verification
3. UPDATE: Use resourceId + new Faker data
4. READ: Verify updated data
5. DELETE: Use resourceId for deletion
6. READ: Verify 404 with resourceId
```

---

## Notes

- All test data generated using Faker (no hardcoded values)
- Test cases derived from requirements only
- No assumption-based test cases included
- Error messages validated using actual API responses
- Framework versions use latest stable releases
- 100% coverage achieved for specified test suite type
```

---

### Step 11: Final QA Validation

**Perform comprehensive QA check:**

```
QA Validation Complete:

Test Planning Coverage:
✅ All requirements analyzed
✅ Test suite type properly planned
✅ All test cases from requirements only
✅ No assumption-based test cases

Test Data Validation:
✅ All test data uses Faker generation
✅ No hardcoded test values
✅ Data uniqueness patterns implemented
✅ Faker dependency included

Coverage Validation:
✅ [Individual] All required fields have 4 test cases
✅ [Individual] All error scenarios covered
✅ [CRUD] Complete lifecycle workflows planned
✅ [CRUD] State transitions validated
✅ Total coverage: [percentage]%

Quality Validation:
✅ Test case titles follow format
✅ Specific test data patterns defined
✅ Exact expected results specified
✅ Precondition dependencies identified
✅ Latest framework versions specified

Documentation Quality:
✅ Test-cases.md structure complete
✅ Requirements summary included
✅ Data generation patterns documented
✅ Dependencies flow documented

Ready for qa-api-test-automator.
```

---

### Step 12: Verification Report

**Output final completion report:**

```
Test Planning Complete:

Test Suite Type: [Individual Endpoint/CRUD Flow/Both]
Total Test Cases: [number]
Precondition Test Cases: [number]
Test Types Covered: [number]
Requirements Coverage: 100%

[Individual Endpoint Breakdown if applicable]
[CRUD Flow Breakdown if applicable]

Test Data Generation: Faker-based (100% unique)
Framework Versions: Latest stable
File Created: [path/test-cases.md]

Ready for qa-api-test-automator.
```

---

## Critical Rules

### 🚫 DO NOT:

1. **NO assumption-based test cases**
   - Only create tests for scenarios explicitly defined in requirements
   - If scenario is not in requirements → DO NOT create test for it
   - When in doubt → ASK

2. **NO undefined error messages**
   - Only include error messages stated in requirements
   - If error message not defined → note as "Error message TBD"

3. **NO invented business rules**
   - Only test rules explicitly mentioned in requirements
   - Do not infer or assume additional rules

4. **NO skipping required field validation**
   - Every required field MUST have: missing, wrong type, null, valid tests

5. **NO vague test cases**
   - Every test case must have specific Faker generation patterns
   - Every test case must have exact expected result

6. **NO hardcoded test data**
   - Never use static emails, usernames, or test values
   - Do not reuse test data across different tests
   - All data must use Faker generation

7. **NO incomplete CRUD coverage**
   - CRUD flows must include all operations in sequence
   - Must validate data persistence across operations
   - Must verify state transitions

8. **NO outdated dependencies**
   - Do not specify older framework versions
   - Always use latest stable releases

### ✅ DO:

1. **Extract ONLY from requirements**
   - Use only information explicitly stated
   - Quote/reference requirements when creating test cases

2. **Ask when information is missing**
   - Stop and ask for clarification
   - Do not proceed with assumptions

3. **Validate completeness**
   - Check all required fields covered
   - Check all error scenarios covered
   - Check all business rules covered
   - Verify 100% coverage achieved

4. **Use proper test case format**
   - Title: '[Action] - [METHOD] [endpoint]'
   - No Test Case IDs
   - Specific Faker generation patterns
   - Exact expected results

5. **Generate unique test data**
   - Use Faker for ALL test data generation
   - Include timestamp or UUID for uniqueness
   - Specify exact Faker patterns for each field
   - Ensure data meets API requirements

6. **Plan appropriate test suite type**
   - Individual endpoint testing for isolated validation
   - CRUD flow testing for resource lifecycle validation
   - Both when complete coverage is needed

7. **Use latest framework versions**
   - Specify current stable releases
   - Include security patches and improvements
   - Update dependency versions

8. **Show comprehensive summaries**
   - Total test cases with breakdown
   - Coverage percentages
   - Test data generation approach
   - Dependencies and flow documentation

## Validation Checklist

Before generating test-cases.md, verify:

### Requirements Validation
- [ ] All requirements analyzed completely
- [ ] No missing information gaps
- [ ] All business rules identified
- [ ] All error scenarios documented

### Test Suite Validation  
- [ ] Appropriate test suite type selected
- [ ] [Individual] All required fields have 4 test cases each
- [ ] [Individual] All error scenarios covered
- [ ] [CRUD] Complete lifecycle workflows planned
- [ ] [CRUD] State transitions validated
- [ ] All test case titles follow format

### Test Data Validation
- [ ] All test data uses Faker generation
- [ ] No hardcoded test values present
- [ ] Data uniqueness patterns specified
- [ ] Faker dependency included
- [ ] Data generation patterns documented

### Coverage Validation
- [ ] 100% coverage achieved for chosen test suite type
- [ ] All requirements have corresponding test cases
- [ ] No assumption-based test cases included
- [ ] All precondition dependencies identified

### Quality Validation
- [ ] Latest framework versions specified
- [ ] Test cases have specific expected results
- [ ] Precondition test cases identified
- [ ] Data dependencies documented
- [ ] Test-cases.md structure complete

### Final Validation
- [ ] Coverage verification completed
- [ ] QA validation performed
- [ ] Ready for qa-api-test-automator
- [ ] All validation checkpoints passed

---

## Output Format

All outputs must be clean, structured, and actionable. No fluff.

**Required sections in test-cases.md:**
1. Test suite type and coverage summary
2. Requirements analysis
3. Test data generation patterns (Faker)
4. Test cases (Individual Endpoint or CRUD Flow)
5. Precondition test cases
6. Test data dependencies and flow
7. Quality validation summary