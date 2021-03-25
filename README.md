# Data visualization of GDP v.s. life Expectancy
website: https://chien314.github.io/

In this project, I have created a website with five scenes for the narrative visualization. The message that I am trying to communicate with the narrative visualization is to understand the correlation between GDP per capita and the life expectancy as well as whether the developing and developed countries follow the same trend. To answer this question, I first collect data about GDP per capita and life expectancy for countries in different regions of the world from the WDI website. 

Next, the narrative structure that I followed is the interactive slide show. I have created five scenes and in each scene the viewers are allowed to use the drop-down menu to select the regions they want to look at or to use the mouseover function to see the details of the chosen country. 
I chose to use scatter plot to present the data since I want to see the relation between two continuous quantitative variables, GDP per capita and life expectancy. In particular, I found that the plot would look better if I show them both in the logarithmic scales. I use the same scatter plot through out all scenes but present subsets of data in each scene depending on the story I want to tell in each scene. The scatter plot nicely shows the correlation between the life expectancy and GDP per capita and ensures that the viewers can understand it by just looking at the plot. Since I use the same scatter plot through out all scenes, this allows the views to navigate the the scenes easily. By following the same visual form it not only provides a consistent visual structure, but also keeps the viewer oriented through transitions, which is an important aspect of narrative storytelling.

In Scene 1, I raised a question “Does higher income mean longer life span?” and tried to answer this question by looking at the countries in Europe. I present the result on the plot for Europe in 1800 in Scene 1 and then I show the same plot but in 2014 in Scene 2. In Scene 2, I reached a conclusion that GDP and life expectancy are positively correlated. However, this raised the second question, “Is this only true for the developed countries?” since we know that most of the countries in Europe are developed countries. To answer this question, I show the scatter plot for Africa in 1800 in Scene 3 and the plot in 2014 in Scene 4 because most of the countries in Africa are developing countries. It looks like that higher GDP indeed leads to high life expectancy and this seems true for both developing and developed countries. In Scene 5, I show that this is indeed the case for all countries by adding a slider bar that allows the viewers to see the variation of the result between 1800 and 2014. The scenes are ordered following the message I want to convey to the viewers. 

Furthermore, I placed annotations right next to the important data points of the plot. I use the same format through out the scenes. The annotations highlight important information such as life expectancy of the year etc. and significantly support the messaging. The parameters I used are scene numbers, regions, and years. When I change the scene number, the web page switch to different states. Every time I change scene numbers, it would trigger the change of parameters and bring me to a different state with different years and regions. I summarize the changes in the table below.

|Scene|	Year|	Region|
|-----|-----|-------|
|1	| 1800 |Europe (default)|
|2	| 2014 |Europe (default)|
|3	| 1800 |Africa (default)|
|4	| 2014 |Africa (default)|
|5	| 1800-2014 (free form)|	Free form |

Table showing the change of parameters triggered by the transition of scenes.

There are affordances I provided to the user. First, I create a drop-down menu on the top-right corner for the region parameter. It contains up and down arrows, which is a strong hint that one can use it to select different regions. For the scene numbers, I highlight it with a color different from that used in the main text so that the viewers can see that easily. In the last scene I also have a slider bar, which clearly suggest the viewers to move the bar and see how the result would change as they move the bar. Second, I also mention all these options explicitly on the webpage and highlight it to make sure that the users know about what options are available to them. 


