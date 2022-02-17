import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children: React.ReactChild | React.ReactChild[]
}

const SafeAreaContainer: React.FC<Props> = ({children}) => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SafeAreaContainer;