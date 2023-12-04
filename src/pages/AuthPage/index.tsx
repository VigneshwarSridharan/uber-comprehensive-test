import { Block, BlockOverrides } from "baseui/block"
import { Account, Client, ID } from 'appwrite';
import { Card, StyledBody } from "baseui/card";
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { useState } from "react";
import { FormControl } from 'baseui/form-control'
import { Input } from "baseui/input";
import { Button } from "baseui/button";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('656c63ed435cda6a6e3d');

const account = new Account(client);


const containerBlockOverrides: BlockOverrides = {
    Block: {
        style: ({ $theme }) => ({
            maxWidth: "480px",
            height: "100px",
            margin: "auto",
            padding: $theme.sizing.scale600,
        }),
    },
};

const AuthPage = () => {
    const [activeKey, setActiveKey] = useState<React.Key>(0);

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Block overrides={containerBlockOverrides}>
            <Card>
                <StyledBody>
                    <Tabs
                        activeKey={activeKey}
                        onChange={({ activeKey }) => setActiveKey(activeKey)}
                        fill={FILL.fixed}
                    >
                        <Tab title="Sign In">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const promise = account.createEmailSession(email, password);

                                promise.then(function (response) {
                                    console.log('response', response); // Success
                                }, function (error) {
                                    console.log(error); // Failure
                                });
                            }}>

                                <FormControl label="Email">
                                    <Input type="email" value={email} onChange={({ target }) => setEmail(target.value)} />
                                </FormControl>
                                <FormControl label="Password">
                                    <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                                </FormControl>
                                <Button type="submit">
                                    Sign In
                                </Button>
                            </form>

                        </Tab>
                        <Tab title="Sign Up">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const promise = account.create(ID.unique(), email, password, fullName);

                                promise.then(function (response) {
                                    console.log('response', response); // Success
                                }, function (error) {
                                    console.log(error); // Failure
                                });
                            }}>
                                <FormControl label="Full Name">
                                    <Input type="email" value={fullName} onChange={({ target }) => setFullName(target.value)} />
                                </FormControl>
                                <FormControl label="Email">
                                    <Input type="email" value={email} onChange={({ target }) => setEmail(target.value)} />
                                </FormControl>
                                <FormControl label="Password">
                                    <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                                </FormControl>
                                <Button type="submit">
                                    Sign Up
                                </Button>
                            </form>
                        </Tab>

                    </Tabs>
                </StyledBody>
            </Card>
        </Block>
    )
}

export default AuthPage