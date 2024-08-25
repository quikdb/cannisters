### **QuikDB Documentation**

#### **Overview**

### **Planned Functions for Front-End Interaction**

1. **Generate ID**:
   - A function to generate unique IDs for various entities within the system.

2. **Create Project**:
   - Users can create projects, with a limit of two projects per user. This function will enforce the project creation limit and return an appropriate response if the limit is exceeded.

3. **Create Databases for A Project**:
   - Users can create databases within a project, with a limit of five databases per project. This function will manage the creation process and enforce the database limit.

4. **Create Data-Groups in a Database**:
   - Users can create data groups within a database, with a limit of ten groups per database. This function will ensure the limit is respected while facilitating the creation of data groups.

5. **Create GroupItems of a DataGroup**:
   - Users can create items within a data group, with a limit of ten items per data group. This function will handle the item creation process and enforce the limit.

6. **Insert Data into GroupItems**:
   - Users can insert data into group items, with a size limit of 300KB per group-item. This function will ensure that data size constraints are respected to optimize resource usage.

7. **Insert Bulk Data into Group Items**:
   - Users can insert bulk data into group items, with a max data size limit of 20MB. This function will facilitate bulk data insertion while enforcing the size limitations.

### **Resource Management and Optimization**

The size limitations for the beta project are crucial for determining how to best allocate resources for resource-intensive users without compromising the speed and efficiency of the ICP. By implementing these constraints, the system can manage space allocation effectively and scale to accommodate a larger number of users on the ICP blockchain.

### **Canister-Based Resource Allocation**

The system will allocate a separate canister for each user. This approach helps manage space allocation efficiently and increases the number of users on the ICP blockchain. By isolating resources in individual canisters, the system can better handle the demands of high-resource users while maintaining optimal performance for all users.
