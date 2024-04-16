import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185 } from "../api/moviedb";

export default function Cast({ cast, navigation }) {
    let carachtername = "Po (Voice)";

    return (
        <View style={{ margintop: 4, marginBottom: 20 }}>
            <Text
                style={{
                    color: "white",
                    fontSize: 22,
                    paddingHorizontal: 10,
                }}
            >
                Top Cast
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingTop: 10,
                }}
            >
                {cast &&
                    cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    navigation.navigate("Person", person)
                                }
                                style={{
                                    marginRight: 10,
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        overflow: "hidden",
                                        borderRadius: 50,
                                        height: 90,
                                        width: 90,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 2,
                                        borderColor: "#737373",
                                        gap: 10,
                                    }}
                                >
                                    <Image
                                        /* source={require("../assets/jack-black.webp")} */
                                        source={{
                                            uri: image185(person?.profile_path),
                                        }}
                                        style={{
                                            borderRadius: 30,
                                            height: 90,
                                            width: 85,
                                        }}
                                    />
                                </View>
                                <Text
                                    style={{
                                        color: "white",
                                        marginTop: 1,
                                        fontSize: 16,
                                    }}
                                >
                                    {person.character.length > 10
                                        ? person.character.slice(0, 10) + "..."
                                        : person.character}
                                </Text>
                                <Text
                                    style={{
                                        color: "#737373",
                                        marginTop: 4,
                                        fontSize: 14,
                                    }}
                                >
                                    {person.name.length > 10
                                        ? person.name.slice(0, 10) + "..."
                                        : person.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
            </ScrollView>
        </View>
    );
}
