# Web Connect WMS/Return Reason Codes

**Swedish Business Central view name:** _Web Connect WMS-/Returorsakskoder_

The **Web Connect WMS/Return Reason Codes** module maps incoming return-related values from external logistics systems (WMS, POS, Return Management systems) to Microsoft Business Central’s standard fields such as **Reason Code**, **Return Reason Code**, **Location Code**, and relevant posting groups.

This ensures a consistent and automated handling of return flows across all connected systems.

The mapping is always driven by data arriving via **[Web Connect Incoming Data Web](incoming-data/README.md)**, which is then translated into Business Central return behaviour through **[Web Connect WMS Documents](wms-documents.md)**.

Each row in this table represents **one external return reason** and defines how it should be interpreted and applied inside Business Central.

### Purpose

- Standardise how return reasons from different systems are interpreted in Business Central
- Automate posting logic, return fees, and cost attribution
- Support system-specific return behaviour (WMS, POS, return portals, exchange apps, etc.)
- Ensure all return data lands correctly in BC regardless of external system terminology

Examples of systems using this mapping:\
✓ WMS (damaged, missing, wrong item, missing picks)\
✓ Return systems (customer return reasons)\
✓ POS (store returns)

### Field Reference

Field| Description
---|---
**Code**| The external value returned by WMS/POS/Return System. This is what Web Connect matches against incoming data.
**Description**| Human-readable description of the external return reason.
**Reason Code**| Mapped to the Business Central standard _Reason Code_ field. Used in adjustments and return orders.
**Return Reason Code**| Mapped to Business Centrals _Return Reason Code_. Used in Sales Return Orders and customer returns.
**Location Code**| Overrides Business Central Location for this return reason. If blank, BC uses default Return Reason setup.
**Gen. Bus. Posting Group**| Overrides Business Central posting group for the return. If blank, BC uses standard posting setup.
**Cost Center Code**| Overrides Business Central dimension for cost center. If blank, standard dimension rules apply.
**Market Code**| Overrides Business Central market dimension. If blank, default applies.
**Add Fee on Return**| Boolean, adds a return fee line when this return reason is used.
**Return Fee Condition**| Condition that must evaluate TRUE for fee to be added.
**Special Return Item**| Specific Business Central Item No. to use for fee lines. If blank uses “Add Item On Return” from Logistics Setup.

### Tip: Use the External Value as the Code

Set **Code** to exactly the value the external system sends, including numeric IDs such as `1001`. Web Connect then matches the incoming value directly, and no [Text Mapping](text-mapping.md) is needed on the incoming side. Use **Description** for the readable name.

Example: a WMS sends `ReturnRowDeviationId` with the values `1001` (other reason) and `1002` (complaint).

Code| Description| Return Reason Code| Location Code
---|---|---|---
1001| Other reason| RETURN| MAIN
1002| Complaint| COMPLAINT| SCRAP

If the external system later introduces new IDs, add new rows and keep the old ones until no returns with the old IDs remain.

### Behaviour and Return Flow Examples

#### Example: WMS Return “DAMAGED”

Incoming value:

    "DAMAGED"

Mapping:

- Reason Code = DAMAGE
- Return Reason Code = DAMAGED
- Add Fee on Return = FALSE

Result:

- Sales Return Order or Item Adjustment created
- Damage reason applied
- No fee added

* * *

#### Example: Customer Return “NOT_WANTED”

Incoming value:

    "NOT_WANTED"

Mapping:

- Reason Code = CUSTOMER
- Return Reason Code = NW
- Add Fee on Return = TRUE
- Special Return Item = NOT_PICKED_FEE

Result:

- A return fee line is added
- Fee item = NOT_PICKED_FEE
- Fee posted to customer credit memo

* * *

### When the Mapping is Used

Scenario| Mapping Applied
---|---
Creating Sales Return Orders from WMS| Yes
Receiving Return Orders from Return Portals| Yes
Applying return reason on POS returns| Yes
Item Adjustments triggered by WMS (broken, expired, missing)| Yes
Exchange order flows| Yes (if reason determines exchange logic)
Adding return fees automatically| Yes
