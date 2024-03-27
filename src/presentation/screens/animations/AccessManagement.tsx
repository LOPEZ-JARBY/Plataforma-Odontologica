import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox, Button } from 'react-native-paper';

type Permission = 'insert' | 'edit' | 'delete' | 'query';
type PermissionsState = Record<Permission, boolean>;

export const AccessManagement = () => {
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
    const [selectedObject, setSelectedObject] = useState<string | undefined>(undefined);
    const [permissions, setPermissions] = useState<PermissionsState>({
        insert: false,
        edit: false,
        delete: false,
        query: false
    });

    const roles = ['Role 1', 'Role 2', 'Role 3'];
    const objects = ['Object 1', 'Object 2', 'Object 3'];

    const handleRoleChange = (value: string | undefined) => setSelectedRole(value);
    const handleObjectChange = (value: string | undefined) => setSelectedObject(value);

    const handlePermissionChange = (permission: Permission) => {
        setPermissions(prevPermissions => ({ 
            ...prevPermissions, 
            [permission]: !prevPermissions[permission] 
        }));
    };

    const handleAssign = () => {
        console.log(`Role: ${selectedRole}`);
        console.log(`Object: ${selectedObject}`);
        console.log('Permissions:', permissions);
    };

    return (
        <View>
            <Picker
                selectedValue={selectedRole}
                onValueChange={handleRoleChange}
            >
                <Picker.Item label="Select Role" value={undefined} />
                {roles.map(role => <Picker.Item key={role} label={role} value={role} />)}
            </Picker>

            <Picker
                selectedValue={selectedObject}
                onValueChange={handleObjectChange}
            >
                <Picker.Item label="Select Object" value={undefined} />
                {objects.map(object => <Picker.Item key={object} label={object} value={object} />)}
            </Picker>

            <View>
                <Text>Permissions:</Text>
                <View>
                    <Checkbox
                        status={permissions.insert ? 'checked' : 'unchecked'}
                        onPress={() => handlePermissionChange('insert')}
                    />
                    <Text>Insert</Text>
                </View>
                <View>
                    <Checkbox
                        status={permissions.edit ? 'checked' : 'unchecked'}
                        onPress={() => handlePermissionChange('edit')}
                    />
                    <Text>Edit</Text>
                </View>
                <View>
                    <Checkbox
                        status={permissions.delete ? 'checked' : 'unchecked'}
                        onPress={() => handlePermissionChange('delete')}
                    />
                    <Text>Delete</Text>
                </View>
                <View>
                    <Checkbox
                        status={permissions.query ? 'checked' : 'unchecked'}
                        onPress={() => handlePermissionChange('query')}
                    />
                    <Text>Query</Text>
                </View>
            </View>
            <Button onPress={handleAssign}>
                Assign
            </Button>
        </View>
    );
};

export default AccessManagement;