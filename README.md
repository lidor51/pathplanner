# PathPlanner
![CircleCI](https://circleci.com/gh/mjansen4857/PathPlanner/tree/master.svg?style=svg)](https://circleci.com/gh/mjansen4857/PathPlanner/tree/master)
![version](https://img.shields.io/github/release/mjansen4857/PathPlanner.svg)
![downloads](https://img.shields.io/github/downloads/mjansen4857/PathPlanner/total.svg)

Windows, MacOS, and Linux versions can be downloaded [here.](https://github.com/lidor51/pathplanner/releases/latest)
Windows Store and Snap Store versions will no longer be updated.

## About
![Path Editor](https://i.imgur.com/7sJ1jsx.png)
PathPlanner is a motion profile generator for FRC robots created by team 3015, and this fork is enhanced by team 1577 (forked of v1.6.0). Every path allows for manual tuning of the robot position and the curve radius at every point. It allows you to create the perfect path for your robot quicker and easier than other generators. PathPlanner can handle more complex paths than other generators because it will slow down the robot as it heads into a turn instead of going through it as fast as possible. If the robot is still not slowing down enough or you would like the robot to go slow at a certain point in the path, the robot's max velocity can be overridden at each point. 

Settings can be updated using the settings button in the top left corner of the window. Actions such as generation, path preview, and saving/loading path files can be done by hovering over the floating button in the bottom right corner and clicking on the desired action. The generate action will allow you to generate a path to be used on a robot. These generated paths can either be deployed directly to the RoboRIO, saved to a CSV file on your computer, or copied to your clipboard as an array. Paths can be saved to and loaded from a file so they can be easily updated. File associations are created, so you can double click on a path file to open it in PathPlanner. Previewing the path will give you an idea of what the robot will look like as it follows the path. This is not a guarantee of what your robot will do because the preview bot lives in a perfect world and does exactly what it is told like a good little bot. The preview bot won't do [this](https://www.youtube.com/watch?v=WWRkd6HCGrc) but real robots can. Please preview responsibly.

Inspiration came from [Vannaka's Generator](https://github.com/vannaka/Motion_Profile_Generator) which uses [Jaci's PathFinder](https://github.com/JacisNonsense/Pathfinder). The app is compatible with Windows, Mac OS, and Linux.

## Working With Paths
<img align="right" width="400" src="https://i.imgur.com/mxX5ac0.png" alt="Point Configuration" />

Paths consist of two types of points: anchor and control points. Anchor points are points that *anchor* the path. They are points that the path will pass directly through. Control points are points that are attached to each anchor point. Control points can be used to fine-tune the curve of a path by pulling the path towards it. Anchor points, as well as their corresponding control points, can be added by right clicking anywhere on the field. They can be removed by by control/command + right clicking on the anchor point that you wish to remove. Any point on the path can be moved by dragging it around. While holding down the shift key and dragging a control point, its angle will be locked. You can right click on any anchor point to enter a position, change the angle (in degrees), and override the maximum velocity at that point. Overriding the velocity lets you slow down your robot at certain points in the path, which will prevent issues where the generation algorithm does not slow the robot down enough to accurately follow a tight curve, or it can just allow the robot to go slow in some areas (e.g. the area between the scale and switch) while maintaining a high speed during the rest of the path. When you are done editing the path, it can be saved and other paths can be loaded to edit. The path can then be generated for use on the robot or previewed in real time.

## Holonomic Mode
![Holonomic Demo](https://i.imgur.com/23Tsgfk.gif)

PathPlanner now comes with an holonomic drive train mode. This mode uses the same generation and pathing as the normal version, but decouples the robot's heading from the rest of the path. This allows teams with a holonomic drive train (Swerve drive, Mecanum, etc) to have control over the robot's rotation as it follows the path.

When holonomic mode is enabled, the robot's perimeter will be drawn at every point along the path. A small gray dot representing the front of the robot will be drawn on the perimeter. This dot can be dragged to change the robot's heading at a given point. During generation, the heading is interpolated between each point.

## Controls and Shortcuts
| Shortcut                                     | Description                              |
|----------------------------------------------|------------------------------------------|
| Left Click + Drag                            | Move Point                               |
| Right Click on Field                         | Add Point                                |
| Shift + Right Click on Field                 | Insert Point Between Two Other Points    |
| Right Click on Anchor Point                  | Edit Point Position/Angle/Velocity       |
| Ctrl/⌘ + Right Click on Anchor Point        | Delete Point                             |
| Shift + Click and Drag on Control Point      | Move Control Point with Angle Locked     |
| Shift + Click and Drag on Anchor Point       | Move Anchor point with Y Position Locked |
| Ctrl/⌘ + S                                  | Save Path                                |
| Ctrl/⌘ + O                                  | Open Path                                |
| Ctrl/⌘ + G                                  | Generate Path                            |
| Ctrl/⌘ + Shift + G                          | Generate Path with Last Used Settings    |
| Ctrl/⌘ + Shift + D                          | Deploy Generated Path to Robot           |
| Ctrl/⌘ + P                                  | Preview Path                             |
| Ctrl/⌘ + Z                                  | Undo                                     |
| Ctrl/⌘ + Y                                  | Redo                                     |
| Ctrl/⌘ + Shift + X                          | Flip path in the X direction             |
| Ctrl/⌘ + Shift + Y                          | Flip path in the Y direction             |

## Output Format Options
| Symbol | Description                                                            |
|--------|------------------------------------------------------------------------|
| x      | X Coordinate (Zeroed at start of path)                                 |
| y      | Y Coordinate (Zeroed at start of path)                                 |
| X      | Field Relative X Coordinate                                            |
| Y      | Field Relative Y Coordinate                                            |
| p      | Position (Center if single file, left/right if split)                  |
| v      | Velocity (Center if single file, left/right if split)                  |
| a      | Acceleration (Center if single file, left/right if split)              |
| pl     | Left Only Position                                                     |
| pr     | Right Only Position                                                    |
| vl     | Left Only Velocity                                                     |
| vr     | Right Only Velocity                                                    |
| al     | Left Only Acceleration                                                 |
| ar     | Right Only Acceleration                                                |
| h      | Absolute Heading in Degrees (-180 to 180)                              |
| H      | Relative Heading in Degrees (-180 to 180)                              |
| w      | Absolute Winding Heading in Degrees                                    |
| W      | Relative Winding Heading in Degrees                                    |
| t      | Time Elapsed                                                           |
| s      | Time Step in Milliseconds                                              |
| S      | Time Step in Seconds                                                   |
| r      | Curve Radius                                                           |
| o      | Angular Velocity                                                       |
| O      | Angular Acceleration                                                   |
| hh     | Holonomic Drive Heading in Degrees (-180 to 180, holonomic drive only) |
| j      | Jerk (Center if single file, left/right if split)                      |
| mk      | Marker Counter                     |

If you would like all headings to be output in radians instead of degrees, you will need to manually edit the settings file located at `{USER HOME}/.PathPlanner/settings.json` and add this entry: `"outputRadians": true`

## Settings
<img align="right" width="400" src="https://i.imgur.com/QYNT1xQ.png" alt="Robot Settings" />

* **Team Number:** Your team number. Used for uploading generated paths to the RoboRIO.
* **RoboRIO Path Location:** The folder on the RoboRIO that you would like the generated paths uploaded to.
* **Units:** The units to use for generation. (Imperial/Feet or Metric/Meters)
* **Game Year:** The game year to use for the field image.
* **Max Velocity:** Maximum velocity of the robot (units/second).
* **Max Acceleration:** Maximum acceleration of the robot (units/second<sup>2</sup>).
* **Time Step:** The amount of time between each point in a profile in seconds.
* **Wheelbase Width:** The width of the robot's drive train, used for splitting the left and right paths.
* **Robot Length:** The length of the robot from bumper to bumper. This is used to draw the robot in the path preview and at the start/end points of the path.
* **Drive Train:** The type of drive train your robot uses (Skid Steer or Holonomic). When holonomic drive is selected, a gray dot will appear on the robot perimter. This dot represents the front of the robot and can be dragged to chnge the robot's heading at a given point.

## Path Generation
<img align="right" width="400" src="https://i.imgur.com/uLdE7xy.png" alt="Path Generation" />

* **Output Type:** The output type. Options are CSV file, Java array, C++ array, or Python array. CSV files are saved to a chosen location and arrays are copied to the clipboard.
* **Path Name:** The name of the path. Underscores are assumed for CSV files and Python arrays while camel case is assumed for Java and C++ arrays.
* **Output Format:** The format to use for the output of the generation. This should consist of one or more [output format options](#output-format-options) separated by commas.

    For example, a CSV file with format of p,v,a will output files where each line in the files is:

    `{position},{velocity},{acceleration}`
    
    **This field is case sensitive.**
* **CSV Header:** Optional header line for CSV files.
* **Reversed Output:** Should the robot drive backwards
* **Split Path:** Should the generated path be split into two paths for each side of the drive train

There are two different ways to generate paths. One is normal generation, where you can either save CSV files to your computer or arrays will be copied to your keyboard. The second option is deploying to the robot. This will generate CSV files and upload them to the RoboRIO (assuming you're connected to the robot) at the path chosen in the settings.

## How to build manually:
* Install [Node.js](https://nodejs.org)
* Clone this repository
* Run the following in the root directory of this project:
  * `npm install`
  
  * Build Windows: `npm run build-win`

  * Build MacOS: `npm run build-mac`

  * Build Linux: `npm run build-linux`
  
  * Run in Development Mode: `npm start`
* The built application will be located in `/dist`
